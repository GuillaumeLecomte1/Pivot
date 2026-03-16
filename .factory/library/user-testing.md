# User Testing

Testing surface and validation guidance.

## Validation Surface

This mission focuses on unit and component testing with Vitest:
- **Surface:** Vitest test runner (jsdom environment)
- **Tools:** @testing-library/react, vitest
- **Setup:** Already configured in vitest.config.ts

## Testing Strategy

### Unit Tests
- Test lib/either.ts, lib/option.ts, lib/schema.ts
- Test new HTTP service
- Test storage services

### Component Tests  
- Test React components with @testing-library/react
- Mock external dependencies
- Test user interactions

### Integration Tests
- Test HTTP client usage in components
- Test theme service integration

## Test Execution

```bash
npm run test:run    # Run all tests once
npm run test       # Watch mode
```

## Resource Cost

- Tests run in jsdom (lightweight)
- No browser automation needed
- Max concurrent: 5 (tests are isolated)
