# Worker Skill

## Overview
This worker implements features for the Effect.ts refactoring mission. It handles:
- HTTP service with Effect.ts
- Lib enhancements with Effect.ts
- Component tests

## Procedure

### 1. Setup
- Read mission.md to understand the mission goals
- Read AGENTS.md for constraints and conventions
- Run `npm install` to ensure dependencies are available
- Run `npm run test:run` to establish baseline

### 2. Implementation
For each feature assigned:
1. Read relevant existing code in resources/js/
2. Implement the feature following the description in features.json
3. Write/update tests for the feature
4. Run `npm run test:run` to verify tests pass
5. Run `npm run types` to verify TypeScript
6. Run `npm run check` for lint/format

### 3. Handoff
When completing a feature:
- Commit changes with descriptive message
- Report what was completed
- Note any discovered issues or incomplete work

## Key Conventions
- Use Effect.ts patterns: Either, Option, Schema
- Test with @testing-library/react
- Mock external dependencies
- Maintain backward compatibility with existing lib/ exports
