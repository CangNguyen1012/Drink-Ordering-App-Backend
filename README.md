# API Documentation

## Overview

This is a RESTful API for an e-commerce platform. The API allows users to create and manage stores, create and manage orders, and search for stores.

## API Endpoints

### Stores

- `GET /api/store`: Returns a list of all stores.
- `GET /api/store/:storeId`: Returns the details of a store with the given ID.
- `POST /api/store`: Creates a new store.
- `PUT /api/store/:storeId`: Updates the details of a store with the given ID.
- `DELETE /api/store/:storeId`: Deletes a store with the given ID.

### Orders

- `GET /api/order`: Returns a list of all orders.
- `GET /api/order/:orderId`: Returns the details of an order with the given ID.
- `POST /api/order`: Creates a new order.
- `PUT /api/order/:orderId`: Updates the details of an order with the given ID.
- `DELETE /api/order/:orderId`: Deletes an order with the given ID.

### Search

- `GET /api/search`: Returns a list of stores that match the search query.

## Request and Response Formats

All API endpoints accept and return data in JSON format.

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. The JWT is included in the `Authorization` header of each request.

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request. The API also returns a JSON object with a `message` property to provide additional information about the error.
