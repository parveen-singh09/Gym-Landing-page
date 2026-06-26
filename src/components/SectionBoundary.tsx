"use client";

import { Component, type ReactNode } from "react";

interface SectionBoundaryProps {
  /** Identifies which section failed, used for logging. */
  name: string;
  children: ReactNode;
}

interface SectionBoundaryState {
  hasError: boolean;
}

/**
 * React error boundary that isolates a single composed section. If a child
 * throws during render, the boundary logs the section `name` and renders
 * `null` so only the failed section is omitted while the rest of the page
 * continues to render.
 */
export default class SectionBoundary extends Component<
  SectionBoundaryProps,
  SectionBoundaryState
> {
  state: SectionBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.error(`SectionBoundary: "${this.props.name}" failed to render`, error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
