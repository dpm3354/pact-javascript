# PACT Workshop

### Create a pact for getting a product by id

#### Setup
```
$ npm i
$ npm run pact-broker
```

#### 1. Add test in the client spec.
./client/client.spec.js
```
describe('#getById', () => {
  it('should return product based on id', async function () {
    await provider.addInteraction(mocks.getById)
    const response = await client.getById(1)

    const expectedBody = {
      name: 'Bar',
      img: 'https://webshop.com/img/cheap-shoe.png',
      price: 2,
      stock: 3,
      id:1
    }

    expect(response).to.be.eql(expectedBody)

    await provider.verify()
  })
})
```

#### 2. In mocks.js, add the following interaction after registerProduct (line 80)
./client/expectation/mocks.js

```
,
getById: {
  state: 'a product with id of 1 is created',
  uponReceiving: 'a request to retrieve product by id',
  withRequest: {
    method: 'GET',
    path: '/products/1'
  },
  willRespondWith: {
    status: 200,
    body: PRODUCT_ID_BODY
  }
}
```

#### 3. Run the consumer tests
```
$ npm run test-consumer
```
You should get the following:
```
CLIENT: Current products are: Foo
      ✓ should get product list from server
    #getProducts
      ✓ should return product list based on query
    #registerProduct
      ✓ should send product registration request
    #getById
      ✓ should return product based on id


  4 passing (1s)

```

You'll see that client-productservice.json has been updated with the new contract.

```
    {
      "description": "a request to retrieve product by id",
      "providerState": "a product with id of 1 is created",
      "request": {
        "method": "GET",
        "path": "/products/1"
      },
      "response": {
        "status": 200,
        "headers": {
        },
        "body": {
          "id": 1,
          "name": "Bar",
          "img": "https://webshop.com/img/cheap-shoe.png",
          "price": 2,
          "stock": 3
        },
        "matchingRules": {
          "$.body.id": {
            "match": "type"
          }
        }
      }
    }
```

#### 4. Run the publisher to publish the new contract. 
```
npm run publish-pacts
```

Go to http://localhost:8080/ <br>
* You should see that the "Last pact published" for the ProductService  was updated "less than a minute ago"

Click on the page icon in the row and you should see the new contract:
```
Given a product with id of 1 is created, upon receiving a request to retrieve product by id from Client, with

{
  "method": "GET",
  "path": "/products/1"
}

ProductService will respond with:

{
  "status": 200,
  "body": {
    "id": 1,
    "name": "Bar",
    "img": "https://webshop.com/img/cheap-shoe.png",
    "price": 2,
    "stock": 3
  }
}
```

#### 5. Add the new test to the provider tests in testProductsService.js by adding a new case to the switch statement
./server/consumerTests/testProductsService.js

```
case 'a product with id of 1 is created':
  products._flush()
  products.create({ name: 'Bar', img: 'https://webshop.com/img/cheap-shoe.png', price: 2, stock: 3})
```

#### 6. Finally, run the provider tests
```
npm run test-provider
```


### Challenge / Extra Credit:
Create a new 
