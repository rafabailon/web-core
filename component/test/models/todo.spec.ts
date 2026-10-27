import { Todo } from "../../src/models/todo";

describe("Todo models", () => {
  it("allows creating todo objects", () => {
    const todo: Todo = {
      content: "Test todo",
      id: "123e4567-e89b-12d3-a456-426614174000",
    };
    expect(todo.content).toBe("Test todo");
    expect(todo.id).toBeDefined();
  });
});
