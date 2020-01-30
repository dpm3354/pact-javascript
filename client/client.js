'use strict'

/**
 * This class calls the backend.
 */

const request = require('request-promise-native')
const _ = require('lodash')

const PRODUCTS_SERVICE_URL = process.env.PRODUCTS_SERVICE_URL || 'http://localhost:1234'

async function getAllProducts() {
    const products = await request(`${PRODUCTS_SERVICE_URL}/products`)
        .then(JSON.parse)

    const productsString = _.reduce(products, (logString, product) => `${logString} ${product.name}`, 'CLIENT: Current products are:')

    console.log(productsString)
}

function getProducts(query) {
    return request({
        uri: `${PRODUCTS_SERVICE_URL}/products`,
        qs: query,
        json: true
    })
}

function getById(id) {
    return request({
        uri: `${PRODUCTS_SERVICE_URL}/products/` + id,
        json: true
    })
}

function registerProduct(product) {
    return request.post({
        url: `${PRODUCTS_SERVICE_URL}/products`,
        body: product,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function removeById(id) {
    return request.delete({
        uri: `${PRODUCTS_SERVICE_URL}/products/` + id,
        json: true
    })
}

module.exports = {
    getAllProducts,
    getProducts,
    registerProduct,
    getById,
    removeById
}
