build-prod:
	docker build -t stubber-ui-production:latest .
run-prod:
	docker run -d -p 80:80 --name stubber-ui stubber-ui-production:latest
docker-clean:
	docker stop stubber-ui
	docker rm stubber-ui

build:
	npm run build

build-dev:
	docker build -f Dockerfile.dev -t stubber-ui-dev:latest .
run-dev:
	docker run -d -p 3000:3000 --name stubber-ui stubber-ui-dev:latest
remove:
	docker stop stubber-ui
	docker rm stubber-ui