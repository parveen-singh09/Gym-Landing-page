import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Smoke test: confirms the Vitest + React Testing Library + jsdom toolchain
// can render a trivial component and that jest-dom matchers are available.
function Hello({ name }: { name: string }) {
  return React.createElement("p", null, `Hello, ${name}!`);
}

describe("test toolchain smoke test", () => {
  it("renders a trivial component", () => {
    render(React.createElement(Hello, { name: "TITAN" }));

    const paragraph = screen.getByText("Hello, TITAN!");
    expect(paragraph).toBeInTheDocument();
  });
});
