# Architecture

Architectural decisions and patterns discovered.

## Effect.ts Usage Patterns

### Either for Error Handling
- Use Either<Success, Error> for operations that can fail
- Left represents failure, Right represents success
- Use flatMap/chain for chaining operations

### Option for Nullable Values
- Use Option<T> for values that may be null/undefined
- Some represents present value, None represents absence
- Use fromNullable to convert nullable to Option

### Schema for Validation
- Use Effect Schema for runtime validation
- Validate API responses before using data
- Create domain-specific schemas

## Existing Patterns

### lib/ Structure
- `either.ts` - Either utilities
- `option.ts` - Option utilities  
- `schema.ts` - Schema validation utilities
- `utils.ts` - General utilities (cn, validateType)

### Components
- Located in resources/js/components/
- UI components in resources/js/components/ui/
- Tests alongside components or in resources/js/tests/

### Data Directory (resources/js/data/)
- Used for large static datasets (GeoJSON, reference data)
- Files in this directory contain raw data that doesn't change
- Example: `franceDepartments.ts` contains GeoJSON path data for 96 French departments (207KB)
- Consider lazy-loading for large datasets if not needed on initial page load
