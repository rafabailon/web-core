# Using Web Core as a Base Project

This skeleton is designed to be used as a base for new web projects. Follow these steps to customize it for your needs.

## Initial Setup

1. **Rename the project**: Update all references from "Web Core" to your project name
   - Update `package.json` files across the monorepo
   - Update README.md, manifest.json, and other configuration files
   - Update composer.json names
   - Update Docker service names if needed

2. **Environment Configuration**
   - Copy `.env.dist` files to `.env.local`
   - Configure API URLs, database credentials, and other environment variables
   - Update `hosts` file for local development (`app.local`, `api.app.local`)

3. **Install Dependencies**
   ```bash
   make init  # For Docker-based setup
   # or
   yarn install
   cd apps/api && composer install
   cd core && composer install
   ```

## What to Modify

### Frontend
- **Routes** (`apps/frontend/src/routes.tsx`): Add/remove routes for your application
- **Components** (`component/src/`): Create your own components or extend existing ones
- **Styles** (`asset/styles/`): Customize themes and styles
- **Translations** (`component/src/strings/locales/`): Add your own translations

### Backend API
- **Entities/Domain** (`core/src/Domain/`): Define your domain models
- **Application Services** (`core/src/Application/`): Implement business logic (CQRS handlers)
- **Controllers** (`apps/api/src/Controller/`): Create API endpoints
- **Migrations** (`apps/api/src/Migrations/`): Add database migrations

### Configuration
- **Docker** (`docker-compose.yml`): Adjust services as needed
- **Tests**: Update or replace example tests with your own

## Development Tips

- The component library is shared - put reusable UI components there
- Follow DDD/CQRS patterns in the core for clean architecture
- Use the provided Todo example as a reference implementation
- Keep the monorepo structure for code sharing between packages

## Cleaning Up

Remove example code when starting fresh:
- Replace Todo-related components with your own domain models
- Update API endpoints
- Modify tests accordingly
