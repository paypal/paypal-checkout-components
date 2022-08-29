/* @flow */

import { autoFocusOnFirstInput, goToNextField, goToPreviousField } from "./card-focus";

function triggerFocusListener(input) {

    const focusListener = window.addEventListener.mock.calls.find((args) => {
        return args[0] === 'focus';
    })[1];

    focusListener();

    if (input) {

        const focusinListener = window.addEventListener.mock.calls.find((args) => {
            return args[0] === 'focusin';
        })[1];

        focusinListener({ target: input });
    }

    jest.runAllTimers();

}

describe("autoFocusOnFirstInput", () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, "addEventListener").mockImplementation(jest.fn());
    input = document.createElement("input");
  });

  it("noops when no input is passed", () => {
    autoFocusOnFirstInput();

    expect(window.addEventListener).not.toBeCalled();
  });

  it("adds a focus and focusin listener when input is available", () => {
    autoFocusOnFirstInput(input);

    expect(window.addEventListener).toBeCalledTimes(2);
    expect(window.addEventListener).toBeCalledWith(
      "focus",
      expect.any(Function)
    );
    expect(window.addEventListener).toBeCalledWith(
      "focusin",
      expect.any(Function)
    );
  });

  it("noops when the an HTMLInputElement gets focus", () => {
    const spy = jest.spyOn(input, "focus");

    autoFocusOnFirstInput(input);

    triggerFocusListener(input);

    expect(spy).not.toBeCalled();
  });

  it("focuses on input when the window gets focus", () => {
    const spy = jest.spyOn(input, "focus");

    autoFocusOnFirstInput(input);

    triggerFocusListener();

    expect(spy).toBeCalledTimes(1);
  });

  it("applies a focus patch for Safari using setSelectionRange", () => {
    input.value = "foo";

    input.setSelectionRange(1, 2);

    const spy = jest.spyOn(input, "setSelectionRange");
    autoFocusOnFirstInput(input);

    triggerFocusListener();

    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith(0, 0);
    expect(spy).toBeCalledWith(1, 2);
  });

  it("adjusts and resets the inputs value when it is empty to accomodate Safari quirk", () => {
    input.value = "";

    const spy = jest.spyOn(input, "value", "set");
    autoFocusOnFirstInput(input);

    triggerFocusListener();

    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith(" ");
    expect(spy).toBeCalledWith("");
  });
});

describe("goToNextField", () => {
  it('puts the cursor at the start of the next field', () => {
    jest.useFakeTimers();
    const element = document.createElement('input');
    const ref = {
      current: {
        base: element
      }
    };

    goToNextField(ref)();
    const spy = jest.spyOn(element, 'focus')
    jest.runAllTimers()

    expect(element.selectionStart).toBe(0);
    expect(spy).toHaveBeenCalled()
  })
})

describe("goToPreviousField", () => {
  it('puts the cursor at the end of the previous field', () => {
    jest.useFakeTimers();

    const element = document.createElement('input');
    element.value = 'foo'
    const ref = {
      current: {
        base: element
      }
    };

    goToPreviousField(ref)();
    const spy = jest.spyOn(element, 'focus')
    jest.runAllTimers()

    expect(element.selectionStart).toBe(3);
    expect(spy).toHaveBeenCalled()
  })
})