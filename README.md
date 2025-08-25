# SWStarter Webapp

This project was developed using **Next.js**, **TypeScript**, and **TailwindCSS**.

The implementation was based on the provided design and comments.

Requests to the **SWAPI** are made directly using the `fetch` API, with results being cached to improve performance.
This means that the first access may take longer, but subsequent requests respond much faster. Since the API is static,
no cache invalidation mechanism was implemented.

Although responsiveness was not part of the original design specification, I took the liberty to implement it.
Adjustments were made to ensure that the application supports **different screen sizes**, providing a better experience
across devices.

## Running Locally with Docker Compose

### Prerequisites

- Docker
- Docker Compose

### Instructions

#### 1. Clone the Repository.

#### 2. Open your terminal and run:

```shell
docker-compose up --build
```

#### 3. Accessing the API

The webapp will be available at:

```
http://localhost:3000/
```
