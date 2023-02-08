A !=
API_URL !=
TEST !=

ps:
	docker compose ps

build:
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose build

buildverbose:
	BUILDKIT_PROGRESS=plain COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose build

restart:
	docker compose restart

start:
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 API_URL=${API_URL} TEST=${TEST} docker compose up

stop:
	docker compose stop

logs:
	docker compose logs ${A}

logsb:
	docker compose logs backend

help:
	cat Makefile
