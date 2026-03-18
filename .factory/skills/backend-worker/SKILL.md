---
name: backend-worker
description: Laravel backend development for Pivot demo mode
---

# Backend Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the WORK PROCEDURE.

## When to Use This Skill

This skill is for Laravel backend features:
- SQLite database setup and configuration
- Migrations for demo tables
- Seeders for demo data
- API controllers for product CRUD
- Authentication and middleware
- Route definitions

## Work Procedure

### 1. Understand Requirements
- Read the feature description in features.json
- Read the mission.md and AGENTS.md for context
- Check existing models and migrations for patterns

### 2. Implement Backend Changes
For each task:

**Database/Migration:**
1. Edit or create migration file in `database/migrations/`
2. Use `php artisan make:migration` to generate file
3. Define schema matching the requirements
4. Run `php artisan migrate --database=sqlite` to test

**Seeder:**
1. Create seeder in `database/seeders/`
2. Follow existing seeder patterns (see RessourcerieSeeder.php)
3. Use `bcrypt()` for passwords
4. Associate Ressourcerie with User via `user_id`

**Controller:**
1. Create controller in `app/Http/Controllers/`
2. Use `final class` and proper typing
3. Return Inertia responses or JSON APIs
4. Validate input using Laravel's Validator

**Routes:**
1. Add routes to `routes/web.php` or `routes/api.php`
2. Use proper HTTP methods (GET, POST, PUT, DELETE)
3. Apply appropriate middleware

### 3. Verify Implementation
- Run `php artisan migrate --database=sqlite` - should succeed
- Run `php artisan db:seed --database=sqlite --class=DemoSeeder` - should succeed
- Test API endpoints with curl:
  - `curl http://localhost:8000/api/demo/credentials` should return 200
  - `curl -X POST http://localhost:8000/api/products -d {...}` should create product

### 4. Manual Verification
- Verify database data with `sqlite3 database/demo.sqlite "SELECT * FROM users"`
- Check API responses with curl
- Ensure no errors in Laravel logs

## Example Handoff

```json
{
  "salientSummary": "Created demo SQLite database, DemoSeeder with 2 users and 4 products, and GET /api/demo/credentials endpoint. Migration and seeder tested successfully.",
  "whatWasImplemented": "Created database/demo.sqlite, DemoSeeder creating client@demo.pivot and ressourcier@demo.pivot users with hashed passwords, 1 ressourcerie in dept 49, 4 sample products. Created DemoController@credentials returning demo user credentials.",
  "whatWasLeftUndone": "",
  "verification": {
    "commandsRun": [
      { "command": "touch database/demo.sqlite", "exitCode": 0, "observation": "SQLite file created" },
      { "command": "php artisan migrate --database=sqlite", "exitCode": 0, "observation": "Migrations ran successfully, 4 tables created" },
      { "command": "php artisan db:seed --database=sqlite --class=DemoSeeder", "exitCode": 0, "observation": "Seeder ran, 2 users and 4 products created" },
      { "command": "curl http://localhost:8000/api/demo/credentials", "exitCode": 0, "observation": "Returns {\"client\":{\"email\":\"client@demo.pivot\",\"password\":\"demo123\"},\"ressourcier\":{\"email\":\"ressourcier@demo.pivot\",\"password\":\"demo123\"}}" }
    ],
    "interactiveChecks": []
  },
  "tests": { "added": [] },
  "discoveredIssues": []
}
```

## When to Return to Orchestrator

- Database migration fails and fix is unclear
- Auth flow requires changes to existing Laravel auth scaffolding
- API design conflicts with existing patterns
- Feature depends on frontend work that isn't ready
