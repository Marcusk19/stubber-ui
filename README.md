# Stubber-UI

repo containing ui for stubber app built using React.

## Installation
---
Assuming you have a stubber instance you can point the ui to - run the following to get started
```
npm install
```

## Development
---
Start the dev server by running
```
npm start
```
Open http://localhost:3000 to view it in the browser.
<br/>
Look at `example.env` for directing at the stubber app - copy to your own `.env` file and change the value to your endpoint.

## Testing
---
```
npm test
```

## Docker
---
Scripts are available for running either production or development build as containers.
<br/>
For development:
```
make build-dev
make run-dev
```
For production:
```
make build-prod
make run-prod
```

## React
---
Check out the [getting started guide](react-getting-started.md) if you want to learn more about using React.