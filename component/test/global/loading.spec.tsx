import React from "react";
import Loading from "../../src/global/loading";
import { render } from "@testing-library/react";

describe("Loading component", () => {
  it("renders loading text", () => {
    const { getByText } = render(<Loading />);
    expect(getByText("Loading...")).toBeTruthy();
  });
});
