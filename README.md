# 🔐 SecureVault API

A security-focused REST API built with **Node.js and Express.js**, demonstrating the integration of [`express-api-guard`](https://www.npmjs.com/package/express-api-guard), a custom Express middleware security toolkit.

SecureVault provides basic Notes CRUD operations while demonstrating how common API security mechanisms can be integrated into an Express application using reusable middleware.

## 🚀 Features

### Notes Management (CRUD)

- Create a new note.
- Retrieve all notes.
- Update an existing note.
- Delete a note.
- Validate incoming note data.
- Handle invalid requests and missing resources.

### Security Features

SecureVault integrates all six middleware functions provided by `express-api-guard`.

| Middleware | Description |
|---|---|
| `requestId()` | Generates a unique ID for every incoming request. |
| `rateLimiter()` | Limits the number of requests within a specified time window. |
| `securityHeaders()` | Adds HTTP security headers to responses. |
| `ipGuard()` | Supports IP blocklisting and allowlisting. |
| `requestSize()` | Rejects requests exceeding the configured Content-Length limit. |
| `securityLogger()` | Logs selected security-related HTTP response events. |

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Backend:** Express.js 5
- **Security Middleware:** express-api-guard
- **Environment Variables:** dotenv
- **Development Tool:** Nodemon
- **API Testing:** cURL

## 📁 Project Structure

```text
secureVault/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── routes/
│   │   └── notes.routes.js
│   │
│   ├── controllers/
│   │   └── notes.controller.js
│   │
│   └── data/
│       └── notes.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/siddhitripathi25/securevault-api.git
```

### 2. Navigate into the project

```bash
cd securevault-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5050
```

You can also use `.env.example` as a reference.

### 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5050
```

## 🔗 API Endpoints

Base URL:

```text
http://localhost:5050
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/api/notes` | Create a note |
| GET | `/api/notes` | Retrieve all notes |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### 1. Health Check

**GET** `/`

Checks whether the API server is running.

Example response:

```json
{
  "success": true,
  "message": "Welcome to SecureVault API!",
  "requestId": "generated-request-id"
}
```

### 2. Create a Note

**POST** `/api/notes`

Request body:

```json
{
  "title": "My First Note",
  "content": "This is my first secure note."
}
```

Expected status: `201 Created`

### 3. Get All Notes

**GET** `/api/notes`

Retrieves all available notes.

Example response:

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1731840000000,
      "title": "My First Note",
      "content": "This is my first secure note."
    }
  ]
}
```

### 4. Update a Note

**PUT** `/api/notes/:id`

Example:

```text
PUT /api/notes/1731840000000
```

Request body:

```json
{
  "title": "Updated Note",
  "content": "This note has been updated."
}
```

Expected status: `200 OK`

### 5. Delete a Note

**DELETE** `/api/notes/:id`

Example:

```text
DELETE /api/notes/1731840000000
```

Expected status: `200 OK`

## 🛡️ Security Middleware Integration

SecureVault uses the published npm package:

**[`express-api-guard`](https://www.npmjs.com/package/express-api-guard)**

Install it independently using:

```bash
npm install express-api-guard
```

### 1. Request ID

```js
app.use(requestId());
```

Generates a unique UUID for every incoming request and attaches it to:

- `req.requestId`
- `X-Request-ID` response header

### 2. Security Headers

```js
app.use(securityHeaders());
```

Adds the following response headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`

### 3. IP Guard

```js
app.use(ipGuard({
    blockedIPs: []
}));
```

Supports:

- Blocking specific IP addresses.
- Allowing only explicitly permitted IP addresses.

An empty blocklist means no IP addresses are blocked.

### 4. Rate Limiter

```js
app.use(rateLimiter({
    windowMs: 60 * 1000,
    max: 5
}));
```

Limits each IP address to five requests within a 60-second window.

Excess requests receive:

```text
429 Too Many Requests
```

### 5. Request Size Limiter

```js
app.use(requestSize({
    limit: 1024 * 1024
}));
```

Sets a maximum declared request size of 1 MB.

Requests declaring a larger `Content-Length` receive:

```text
413 Payload Too Large
```

### 6. Security Logger

```js
app.use(securityLogger());
```

Logs selected security events:

```text
[SECURITY] BLOCKED_REQUEST
[SECURITY] PAYLOAD_TOO_LARGE
[SECURITY] RATE_LIMIT_EXCEEDED
```

## 🧪 Testing

You can test the API using cURL, Postman, or any HTTP client.

Example:

```bash
curl -i http://localhost:5050/
```

Create a note:

```bash
curl -X POST http://localhost:5050/api/notes \
-H "Content-Type: application/json" \
-d '{
  "title": "SecureVault",
  "content": "Testing the API"
}'
```

Retrieve notes:

```bash
curl http://localhost:5050/api/notes
```

Test request-size protection:

```bash
curl -i -X POST http://localhost:5050/api/notes \
-H "Content-Type: application/json" \
-H "Content-Length: 2000000" \
-d '{}'
```

Expected response:

```text
413 Payload Too Large
```

## ⚠️ Current Limitations

SecureVault is a learning and demonstration project. It is not intended to be a production-ready secure storage platform.

- Notes are stored in an in-memory JavaScript array.
- All notes are lost when the server restarts.
- Authentication and authorization are not implemented.
- Rate limiting uses an in-memory Map, so counters reset on restart and are not shared between multiple server instances.
- Request-size protection checks the declared `Content-Length` header and does not independently enforce a streamed-byte limit.
- IP filtering depends on the IP address reported by Express.
- Security logging currently monitors selected status codes set through `res.status()`.

## 🎯 Project Objective

The primary objective of SecureVault is to demonstrate how reusable security middleware can be integrated into a real Express.js application.

It also serves as a practical demonstration of the npm package [`express-api-guard`](https://www.npmjs.com/package/express-api-guard), showing how developers can add common security-related middleware to their APIs with minimal configuration.

## 👩‍💻 Author

**Siddhi Tripathi**

B.Tech CSE (AI & ML)  
Newton School of Technology

- GitHub: [@siddhitripathi25](https://github.com/siddhitripathi25)
- npm Package: [express-api-guard](https://www.npmjs.com/package/express-api-guard)
- Project Repository: [securevault-api](https://github.com/siddhitripathi25/securevault-api)

---

⭐ If you find this project useful, consider giving the repository a star.