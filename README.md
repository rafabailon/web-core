# Web Core

## Overview

Web Core is a monorepo application for a Todo management system with a modern web frontend and a REST API backend.

## Project Structure

```
web-core/
├── apps/
│   ├── api/          # Symfony REST API backend
│   └── frontend/     # React frontend application
├── component/        # Shared React component library
├── asset/           # Shared assets (styles, themes, Tailwind)
├── core/            # PHP Domain/Application core (DDD + CQRS)
├── features/        # Behat BDD tests
└── docker/          # Docker configuration
```

## Quick Start

Run `make help` to see all available actions. To set up the environment for the first time, run `make init`.

In subsequent occasions run `make up` to spin up the containers and `make bash` to run a bash command inside the main container.

Add to your `/etc/hosts`:

```
127.0.0.1       app.local
127.0.0.1       api.app.local
```

Access the applications:
- [http://app.local/](http://app.local/) - React application
- [http://api.app.local/docs](http://api.app.local/docs) - API documentation

## Development

### Running Tests
Run `make test` to execute all test suites (Psalm, PHPSpec, Jest, Behat, Cypress).

### Frontend Development
- `yarn start:frontend` - Start the frontend development server
- `yarn test` - Run component tests
- `yarn workspace @web-core/frontend test` - Run frontend tests

### Code Quality
- `yarn eslint` - Run ESLint
- `yarn format` - Format code with Prettier

## Deployment

See the original documentation for deployment instructions to AWS Amplify and environment configuration.
