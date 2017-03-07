# PayPal Checkout Integration Patterns Demo WebApp

## Description

The demo web application is a React app that shows different styles of PayPal integrations. It uses the wonderful [Ace Code Editor](https://github.com/ajaxorg/ace) to provide a live demonstration HTML and Javascript code which you can tweak and see rendered on the page.

## Development

The source is found in the `demo/app` directory.

Please feel free to follow the [Contribution Guidelines](../CONTRIBUTING.md) to contribute to this demo application. PRs are welcome, but for major changes please raise an issue first.

### Run locally in Docker

This command downloads all requirements, builds the source and starts the app inside the container. Nothing other than Docker needs to be installed.

```sh
$ docker-compse up
```

If you make code changes and want to see them reflected, you will need to rebuild the container with and start the updated container with the following commands

```sh
$ docker-compose build
$ docker-compuse up
```

### Run locally at command line

#### Download project requirements

```sh
$ npm install -g gulp flow-bin flow-typed
$ npm install
$ flow-typed install
```

#### Build the React app

```sh
$ gulp webpack-demo
```

#### Start the app

```sh
$ node demo/app/server
```
