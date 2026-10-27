import React from "react";
import { BaseNewTodoInput } from "../../../src/pages/todo/NewTodoInput";
import Theme from "../../../src/theme/Theme";
import { render, fireEvent } from "@testing-library/react";

describe("New todo input", () => {
  let submit: (e: any) => void;

  beforeEach(() => {
    submit = jest.fn();
  });

  it("submits its content when enter is pressed", () => {
    const { getByPlaceholderText } = render(
      <Theme>
        <BaseNewTodoInput submit={submit} />
      </Theme>,
    );

    const input = getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Plant a tree" } });
    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13,
      charCode: 13,
      which: 13,
    });

    expect((submit as jest.Mock).mock.calls).toEqual([["Plant a tree"]]);
  });
});
