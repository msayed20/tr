# Path to the Docker Compose file
FILE=./docker-compose.yml

# Check if Docker is available before proceeding
DOCKER_CHECK := $(shell command -v docker-compose 2> /dev/null)

# Default target
all: build

# Build and bring up containers in detached mode
build: check
	@echo "Building and starting containers..."
	docker compose -f $(FILE) build --no-cache
	docker compose -f $(FILE) up -d

# Stop and remove all containers
clean: check
	@echo "Stopping and removing containers..."
	docker compose -f $(FILE) down

# Remove containers, networks, images, and volumes
fclean: clean
	@echo "Cleaning up Docker system (including volumes)..."
	docker system prune -af --volumes

# Rebuild everything from scratch
re: fclean build

# Check if Docker is installed and print a message
check:
ifndef DOCKER_CHECK
	$(error Docker is not installed or available in PATH)
else
	@echo "Docker is installed and available."
endif

# Print a helpful message if no target is specified
help:
	@echo "Makefile for Docker Compose:"
	@echo "  make all      - Build and start the containers"
	@echo "  make build    - Build and start the containers"
	@echo "  make clean    - Stop and remove containers"
	@echo "  make fclean   - Clean up the Docker system, including volumes"
	@echo "  make re       - Rebuild everything from scratch"
	@echo "  make check    - Check if Docker is installed and print a message"
	@echo "  make help     - Show this help message"
