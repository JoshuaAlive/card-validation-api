# Card Validation API

A REST API that validates credit/debit card numbers using the **Luhn algorithm**. Built with **Node.js**, **Express.js**, and **TypeScript**.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Design Decisions](#design-decisions)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/JoshuaAlive/card-validation-api.git
cd card-validation-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root of the project:
```bash
PORT=3000
```

**4. Start the development server**
```bash
npm run dev
```

The server will be running at `http://localhost:3000`.

---

## Project Structure

```
card-validation-api/
│
├── src/
│   ├── controllers/
│   │   └── card.controller.ts   # Handles HTTP requests and responses
│   │
│   ├── routes/
│   │   └── card.routes.ts       # Defines API routes
│   │
│   ├── services/
│   │   └── card-validation.service.ts  # Bridge between controller and logic
│   │
│   ├── utils/
│   │   └── luhn.ts              # Pure Luhn algorithm implementation
│   │
│   ├── app.ts                   # Express app setup and middleware
│   └── server.ts                # Entry point - starts the server
│
├── tests/
│   └── luhn.test.ts             # Unit tests for the Luhn algorithm
│
├── .env                         # Environment variables (not committed)
├── .gitignore
├── jest.config.ts               # Jest configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## API Documentation

### Health Check

**`GET /`**

Confirms the server is running.

**Response**
```json
{
  "message": "Card Validation API is running."
}
```

---

### Validate a Card Number

**`POST /api/validate`**

Accepts a card number and returns whether it is valid or not based on the Luhn algorithm.

**Request Body**
```json
{
  "cardNumber": "4111111111111111"
}
```

**Success Response** `200 OK`
```json
{
  "valid": true
}
```

**Error Response — Missing cardNumber** `400 Bad Request`
```json
{
  "error": "Bad Request",
  "message": "cardNumber is required in the request body."
}
```

**Error Response — Wrong type** `400 Bad Request`
```json
{
  "error": "Bad Request",
  "message": "cardNumber must be a string."
}
```

---

## Running Tests

```bash
npm test
```

Expected output:
```
PASS  tests/luhn.test.ts
  Luhn Algorithm Validation
    ✓ should return true for a valid card number
    ✓ should return false for an invalid card number
    ✓ should return false for an empty string
    ✓ should return false for strings with letters
```

---

## Design Decisions

### Why Express.js over NestJS?
Express.js was chosen for its simplicity and minimal overhead. For a focused, single-endpoint API like this, Express keeps the codebase lean and every line of code easy to follow and explain.

### Why the Luhn Algorithm?
The Luhn algorithm (also known as the "Mod 10" algorithm) is the international standard used by all major card networks (Visa, Mastercard, Verve, etc.) to validate card numbers. It detects common typos and invalid sequences by performing a mathematical checksum on the digits.

### Why is a 200 OK returned for invalid cards?
Our endpoint is a **calculator, not a transaction processor**. When a client asks "is this card valid?", the API successfully answers the question — the answer just happens to be `false`. A `400 Bad Request` is only returned when the request itself is malformed (e.g. missing body, wrong data type), not when the card fails the math check.

### Why MVC Architecture?
The project is structured into **Controllers, Routes, Services, and Utils** to keep each layer focused on a single responsibility:
- **Utils** — pure math logic, no knowledge of HTTP
- **Services** — business logic layer, bridges controller and utils
- **Controllers** — handles HTTP request/response only
- **Routes** — maps URLs to controller methods

This makes the code readable, testable, and easy to extend in the future.

### Why named exports over default exports?
Named exports enforce a consistent import name across all files, making the codebase more predictable and easier to navigate for any developer reading the code.

### Why strict: true in tsconfig?
Strict mode enables TypeScript's strictest type checks, catching potential bugs at compile time rather than at runtime. This leads to safer, more reliable code.
