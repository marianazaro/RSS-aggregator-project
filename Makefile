develop:
	npx webpack server
lint:
	npx eslint .
fix:
	npx eslint --fix .
install: 
	npm ci
build:
	NODE_ENV=production npx webpack