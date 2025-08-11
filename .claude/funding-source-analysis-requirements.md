# Button Funding Source Section Requirements

## **1. Section Structure**

- Use `## [Funding Source Name] Button` as main heading
- Follow this exact order of subsections:
  1. **Supported Flows**
  2. **Eligibility Conditions**
  3. **Requirements**
  4. **Style Configuration**
  5. **Test Coverage Analysis**

## **2. Supported Flows Section**

- Use `### **Supported Flows**` heading
- List flow constants as bullet points with their string values
- Format: `- BUTTON_FLOW.NAME ("string_value")`
- Place file reference at end of section

## **3. Eligibility Conditions Section**

- Use `### **Eligibility Conditions**` heading
- Start with summary sentence: "The [Name] button is **eligible** when ALL/ANY of the following conditions are met:"
- Use numbered subsections: `#### 1. **Condition Name**`
- Structure each condition with:
  - **Variable(s)**: List relevant variables
  - **Condition**: Describe the logical condition
  - **Logic**: Explain the if/then logic (optional)
  - **Reason**: Explain why (optional)
- Place file reference at end of each condition subsection

## **4. Requirements Section**

- Use `### **Requirements**` heading
- Start with descriptive sentence about platform/feature requirements
- Use subsections like `#### **Platform Requirements**`
- Structure requirements with:
  - **Platform Check**: Condition that triggers requirements
  - **Variables**: List relevant experiment/config variables
  - **Logic**: Explain the requirement logic
  - **Requirements**: List the actual requirements returned
- Place file reference at end of each requirement subsection

## **5. Style Configuration Section**

- Use `### **Style Configuration**` heading
- Include these subsections (if applicable):
  - `#### **Supported Layouts**`
  - `#### **Available Colors**`
  - `#### **Wallet Menu Display**`
- List configuration values as bullet points
- Place file reference at end of each style subsection

## **6. Test Coverage Analysis Section**

- Use `### **Test Coverage Analysis**` heading
- Include subsections:
  - `#### **Eligibility Tests**`
  - `#### **Requirements Tests**`
  - `#### **Template Rendering Impact**` (if applicable)
- Structure test scenarios with:
  - `##### **Test Category**:`
  - Numbered list: `1. **Test Name** (lines X-Y): condition -> expected_result`
- Use `->` arrows, no emojis or special characters
- Place file reference at end of each test subsection

## **7. File Reference Format**

- Always place at **end** of relevant sections/subsections
- Use format: `**File**: [src/path/file.ext:lines](../src/path/file.ext#LX-LY)`
- For single lines: `#LX`
- For line ranges: `#LX-LY`
- For multiple files: `**Files**: [file1](link1), [file2](link2)`

## **8. Content Guidelines**

- Use markdown formatting consistently
- No emojis or special Unicode characters
- Use `->` for arrows/implications
- Use backticks for code/variable names
- Use **bold** for emphasis on key terms
- Include specific line number references in test descriptions
- Explain the "why" behind complex conditions

## **9. Variables and Constants**

- Reference constants with their string values: `CONSTANT_NAME ("string_value")`
- List variables clearly with their purpose
- Link to constant definitions when relevant

## **10. Cross-References**

- Link to related files when conditions reference other parts of codebase
- Include constant definition files when referencing enum values
- Maintain relative paths from docs folder: `../src/...`

## **11. DEFAULT_FUNDING_CONFIG Handling**

- **When mentioning DEFAULT_FUNDING_CONFIG**: Always show the actual values being used
- **Format**: "uses default [property] from `DEFAULT_FUNDING_CONFIG`: [actual values]"
- **Examples**:
  - Instead of: "uses default eligibility logic"
  - Use: "uses default eligibility logic from `DEFAULT_FUNDING_CONFIG` (always returns `true`)"
  - Instead of: "uses default requirements"
  - Use: "uses default requirements from `DEFAULT_FUNDING_CONFIG`: **Platforms**: `PLATFORM.DESKTOP`, `PLATFORM.MOBILE`"
- **File Reference**: Always include link to `src/funding/common.jsx` with relevant line numbers
- **Transparency**: Show both what is inherited AND what is customized
- **Clarity**: Readers should understand exact values without looking up source code

## **Default Values Reference**

From `src/funding/common.jsx:192-239`:

```javascript
export const DEFAULT_FUNDING_CONFIG: FundingSourceConfig = {
	enabled: true,
	automatic: true,
	layouts: [BUTTON_LAYOUT.VERTICAL],
	platforms: [PLATFORM.DESKTOP, PLATFORM.MOBILE],
	flows: [BUTTON_FLOW.PURCHASE],
	colors: [BUTTON_COLOR.SILVER, BUTTON_COLOR.BLACK, BUTTON_COLOR.WHITE],
	logoColors: {
		[BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
	},
	shapes: [BUTTON_SHAPE.RECT, BUTTON_SHAPE.PILL, BUTTON_SHAPE.SHARP],
	textColors: {
		[DEFAULT]: BUTTON_COLOR.BLACK,
		[BUTTON_COLOR.BLUE]: BUTTON_COLOR.WHITE,
		[BUTTON_COLOR.BLACK]: BUTTON_COLOR.WHITE,
		[BUTTON_COLOR.DARKBLUE]: BUTTON_COLOR.WHITE,
		[BUTTON_COLOR.REBRAND_DARKBLUE]: BUTTON_COLOR.WHITE,
	},
	secondaryColors: {
		[DEFAULT]: BUTTON_COLOR.SILVER,
		[BUTTON_COLOR.BLACK]: BUTTON_COLOR.BLACK,
		[BUTTON_COLOR.WHITE]: BUTTON_COLOR.WHITE,
	},
	secondaryVaultColors: {
		[DEFAULT]: BUTTON_COLOR.SILVER,
		[BUTTON_COLOR.BLACK]: BUTTON_COLOR.BLACK,
		[BUTTON_COLOR.WHITE]: BUTTON_COLOR.WHITE,
	},
	Logo: () => {
		throw new Error(`Not implemented`);
	},
	Label: BasicLabel,
	showWalletMenu: () => {
		return true;
	},
};
```
