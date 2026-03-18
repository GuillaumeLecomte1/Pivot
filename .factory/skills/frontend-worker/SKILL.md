---
name: frontend-worker
description: React/TypeScript frontend development for Pivot demo mode
---

# Frontend Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the WORK PROCEDURE.

## When to Use This Skill

This skill is for React/TypeScript frontend features:
- New pages (Demo selector, Ressourcerie dashboard)
- New components (FranceMap, ProductForm, ProductList)
- Effect.ts schema validation
- Auto-fill animation hook
- Inertia routing and navigation

## Work Procedure

### 1. Understand Requirements
- Read the feature description in features.json
- Read the mission.md and AGENTS.md for context
- Check existing components for patterns (see resources/js/components/ui/)
- Check existing lib/ files for Effect.ts patterns

### 2. Implement Frontend Changes

**New Page:**
1. Create in `resources/js/pages/{Feature}/Index.tsx`
2. Use `final` for component export
3. Use Inertia's `Head` for meta tags
4. Use existing Layout or create minimal wrapper

**New Component:**
1. Create in `resources/js/components/{ComponentName}.tsx`
2. Use TypeScript with proper interfaces
3. Use Tailwind CSS for styling
4. Follow existing component patterns

**Effect.ts Schema:**
1. Create/update `resources/js/lib/schemas/{SchemaName}.ts`
2. Use `Schema.make` for structure
3. Use `Schema.String`, `Schema.Number`, `Schema.Boolean`
4. Use `Schema.optional()` for nullable fields
5. Export validation function that returns Either

**Auto-Fill Animation:**
1. Create hook in `resources/js/hooks/useAutoFill.ts`
2. Use `setTimeout` for character delay
3. Return `startAnimation` function and `isAnimating` state
4. Simulate typing with 300ms per character

### 3. Run Quality Checks
```bash
npm run types        # TypeScript check
npm run lint        # Biome lint
npm run format      # Biome format
```

### 4. Manual Verification
- Start Vite dev server: `npm run dev`
- Navigate to the new page/component
- Test interactions:
  - Demo page: Click cards, watch animation
  - FranceMap: Hover tooltips, click navigation
  - ProductForm: Submit invalid, then valid data

## Example Handoff

```json
{
  "salientSummary": "Created Demo page with two clickable cards, implemented useAutoFill hook with 300ms character delay animation, integrated with login form submission.",
  "whatWasImplemented": "Created resources/js/pages/Demo/Index.tsx with Client and Ressourcier demo cards using framer-motion for entrance animations. Created useAutoFill hook that types credentials character-by-character into email and password fields with 300ms delay, then auto-submits the form.",
  "whatWasLeftUndone": "Full end-to-end flow not tested - needs running backend",
  "verification": {
    "commandsRun": [
      { "command": "npm run types", "exitCode": 0, "observation": "No TypeScript errors" },
      { "command": "npm run lint", "exitCode": 0, "observation": "Biome found no issues" }
    ],
    "interactiveChecks": [
      { "action": "Navigate to /demo", "observed": "Page renders with two demo cards" },
      { "action": "Click 'Démonstration Client'", "observed": "Login form appears with auto-fill animation typing credentials" }
    ]
  },
  "tests": {
    "added": [
      { "file": "resources/js/pages/Demo/Demo.test.tsx", "cases": [{ "name": "renders demo page", "verifies": "VAL-AUTH-001" }] }
    ]
  },
  "discoveredIssues": []
}
```

## When to Return to Orchestrator

- Effect.ts API usage is unclear
- Component requires state management beyond local state
- Need backend API to be ready for integration
- Animation requirements conflict with existing patterns
