/* @flow */

export type WebMCPToolDefinition = {|
  annotations?: Object,
  description: string,
  inputSchema?: Object,
  name: string,
|};

export type WebMCPExecuteRequest = {|
  args: mixed,
  protocolVersion: number,
  registrationId: string,
  toolName: string,
|};

export type WebMCPRegistration = {|
  executeTool: (WebMCPExecuteRequest) => Promise<mixed>,
  protocolVersion: number,
  registrationId: string,
  toolDefinitions: $ReadOnlyArray<WebMCPToolDefinition>,
|};

type ActiveRegistration = {|
  controller: AbortController,
  registrationId: string,
|};

const WEBMCP_PROTOCOL_VERSION = 1;

let activeRegistration: ?ActiveRegistration = null;

function setActiveRegistration(registration: ?ActiveRegistration): void {
  activeRegistration = registration;
}

function getModelContext() {
  // WebMCP is intentionally accessed from this parent-side module. Since the
  // PayPal SDK runs in the merchant document, the merchant page owns the tools.
  // $FlowIgnore[prop-missing]
  return document.modelContext;
}

function validateRegistration(registration: WebMCPRegistration): void {
  if (
    registration.protocolVersion !== WEBMCP_PROTOCOL_VERSION ||
    !registration.registrationId ||
    !Array.isArray(registration.toolDefinitions) ||
    typeof registration.executeTool !== "function"
  ) {
    throw new Error("Invalid PayPal WebMCP registration");
  }

  for (const definition of registration.toolDefinitions) {
    if (
      !definition ||
      typeof definition.name !== "string" ||
      !definition.name ||
      typeof definition.description !== "string" ||
      !definition.description
    ) {
      throw new Error("Invalid PayPal WebMCP tool definition");
    }
  }
}

export async function registerWebMCPTools(
  registration: WebMCPRegistration,
): Promise<{| registered: boolean |}> {
  validateRegistration(registration);

  const modelContext = getModelContext();
  if (!modelContext || typeof modelContext.registerTool !== "function") {
    return { registered: false };
  }

  if (activeRegistration?.registrationId === registration.registrationId) {
    return { registered: true };
  }

  activeRegistration?.controller.abort();
  const controller = new AbortController();
  setActiveRegistration({
    controller,
    registrationId: registration.registrationId,
  });

  try {
    for (const definition of registration.toolDefinitions) {
      await modelContext.registerTool(
        {
          annotations: definition.annotations,
          description: definition.description,
          execute: (args) =>
            registration.executeTool({
              args,
              protocolVersion: registration.protocolVersion,
              registrationId: registration.registrationId,
              toolName: definition.name,
            }),
          inputSchema: definition.inputSchema,
          name: definition.name,
        },
        { signal: controller.signal },
      );
    }
  } catch (error) {
    controller.abort();
    if (activeRegistration?.registrationId === registration.registrationId) {
      setActiveRegistration(null);
    }
    throw error;
  }

  return { registered: true };
}

export function resetWebMCPRegistration(): void {
  activeRegistration?.controller.abort();
  setActiveRegistration(null);
}

export function unregisterWebMCPTools({
  registrationId,
}: {|
  registrationId: string,
|}): void {
  const registration = activeRegistration;
  if (!registration || registration.registrationId !== registrationId) {
    return;
  }

  registration.controller.abort();
  setActiveRegistration(null);
}
