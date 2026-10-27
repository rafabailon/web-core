s=app
u=www-data
COMPOSE ?= docker compose

.PHONY: init
init: rm up copy-env install db ## Recreate Containers and Install Dependencies
.PHONY: copy-env
copy-env: ## Copy .env to .env.local
	cp --no-clobber apps/frontend/.env.dist apps/frontend/.env.local
	cp --no-clobber apps/api/.env apps/api/.env.local
.PHONY: build
build: ## Build Docker Image Ignoring the Cache
	$(COMPOSE) build --no-cache
.PHONY: rm
rm: ## Stop and Delete Containers, Clean Volumes.
	$(COMPOSE) stop
	$(COMPOSE) rm -v -f
	$(COMPOSE) build
.PHONY: stop
stop: ## Stop Environment
	$(COMPOSE) stop
.PHONY: up
up: ## Spin Up Environment
	$(COMPOSE) up -d
.PHONY: bash
bash: ## Connect to the Development Container
	$(COMPOSE) exec --user=${u} ${s} /bin/bash
.PHONY: install
install: ## Install Project Dependencies
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'composer install'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd core && composer install'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && composer install'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'yarn install'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'yarn build:frontend'
.PHONY: db
db: ## Create Database, Migrations and Fixtures
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && chmod +x bin/console'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:database:create --if-not-exists'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:migration:migrate --no-interaction'
.PHONY: test
test: ## Run All the Tests Suites
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd core/ && vendor/bin/psalm'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd core/ && vendor/bin/phpspec run'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && vendor/bin/psalm'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'yarn eslint'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'yarn workspace @web-core/frontend typecheck'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'yarn workspace @web-core/frontend build'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'yarn test --runInBand'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:database:create  --if-not-exists --env=test'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:migration:migrate --no-interaction --env=test'
	$(COMPOSE) run --user=${u} --rm ${s} sh -lc 'cd apps/api && vendor/bin/behat'
	$(COMPOSE) run --user=node --rm --entrypoint='yarn run:cypress' cypress
.PHONY: cypress
cypress: ## Open Cypress
	$(COMPOSE) run --user=node --rm --entrypoint='yarn open:cypress' cypress
.PHONY: logs
logs: ## Look for 's' Service Logs, make s=php logs
	$(COMPOSE) logs -f ${s}
.PHONY: frontend
frontend: ## Spin Up Frontend in Port 8000
	$(COMPOSE) exec --user=${u} ${s} sh -lc 'yarn start:frontend'
.PHONY: help
help: ## Display this Help Message
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
