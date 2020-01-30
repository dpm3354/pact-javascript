# pact-example

This is an example application for demonstrating the use of pact and consumer driven contract testing.


## Usage

Setup

```bash
$ git clone git@github.com:RisingStack/pact-example.git
$ npm i
$ brew install jq

https://stedolan.github.io/jq/
``` 

Run consumer side tests and create pacts

```bash
$ npm run test-consumer
``` 

Start Pact Broker

```bash
$ npm run pact-broker
```

Delete example pact

```bash
$ npm run delete-example-pact
```

Publish pacts

```bash
$ npm run publish-pacts
```

Verify pacts against the provider 

```bash
$ npm run test-provider
```

Run all tests (broker must be running)

```bash
$ npm test
```

Stop docker / pact-broker

```bash
$ npm run stop-broker
```

## Compatibility

The codebase was written using `node v8.9.0`
