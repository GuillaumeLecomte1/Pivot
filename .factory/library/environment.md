# Environment

Environment variables, external dependencies, and setup notes.

**What belongs here:** Required env vars, external API keys/services, dependency quirks, platform-specific notes.
**What does NOT belong here:** Service ports/commands (use `.factory/services.yaml`).

---

## Project Dependencies

- Effect.ts v3.20.0
- @effect/platform v0.95.0
- @effect/schema v0.75.5
- axios for HTTP requests
- React 19 + TypeScript 5.7

## Testing Setup

- Vitest with jsdom environment
- @testing-library/react for component tests
- jsdom for DOM testing
