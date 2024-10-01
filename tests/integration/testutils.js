export const addComponentsToWindow = (components: { [name: string]: any }) => {
  if (!window.paypal) {
    window.paypal = {};
  }

  for (const [name, component] of Object.entries(components)) {
    if (component.__get__) {
      window.paypal[name] = component.__get__();
    } else {
      window.paypal[name] = component;
    }
  }
};

export const createTestContainer = () => {
  const container = document.createElement("div");
  container.id = "testContainer";

  document.body?.appendChild(container);
};

export const destroyTestContainer = () => {
  const container = document.querySelector("#testContainer");

  if (container) {
    container.remove();
  }
};
