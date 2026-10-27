import React from "react";
import { BaseTodoList } from "../../../src/pages/todo/TodoList";
import { render } from "@testing-library/react";

describe("Todo list", () => {
  it("shows loading state when not loaded", () => {
    const { getByText } = render(<BaseTodoList list={[]} loaded={false} />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders todos when loaded", () => {
    const todos = [
      { id: "1", content: "Buy milk" },
      { id: "2", content: "Read book" },
    ];
    const { getByText } = render(<BaseTodoList list={todos as any} loaded={true} />);
    expect(getByText("Buy milk")).toBeTruthy();
    expect(getByText("Read book")).toBeTruthy();
  });
});
