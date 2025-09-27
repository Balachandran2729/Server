# SERVER

This project provides a simple API built with **Node.js**, **Express**, and **MongoDB** (via **Mongoose**) that allows users to store and manage their usernames and passwords. It demonstrates basic **CRUD** (Create, Read, Update, Delete) operations, making it a great learning resource and easily extendable for larger applications.

## 🚀 Features
* Store and manage usernames and passwords.
* CRUD operations with MongoDB.
* RESTful API design.
* Environment variable management with **dotenv**.
* Auto-reload during development with **Nodemon**.

## 📌 APIs
### 🔑 Name and Password API

**Base URL:** https://server-api-practice.onrender.com/api/namepass

**Endpoints:**

| Method | Path          | Description                                                   |
| ------ | ------------- | ------------------------------------------------------------- |
| GET    | `/`           | Get all users                                                 |
| GET    | `/getuser`    | Get a particular user (send username and password in request) |
| POST   | `/add`        | Add a new user                                                |
| PUT    | `/update/:id` | Update a user by ID                                           |
| DELETE | `/delete/:id` | Delete a user by ID                                           |

### 📊 Test Data API

**Base URL:** https://server-api-practice.onrender.com/api/testdata

**Endpoints:**

| Method | Path | Description       |
| ------ | ---- | ----------------- |
| GET    | `/`  | Get all test data |


### 🧑‍💻 Profile API

**Base URL:** https://server-api-practice.onrender.com/api/profile

**Endpoints:**

| Method | Path               | Description                                                     |
| ------ | ------------------ | --------------------------------------------------------------- |
| GET    | `/`                | Get all profiles                                                |
| GET    | `/login`           | Get profile for login (requires username & password in request) |
| GET    | `/:id`             | Get profile by ID                                               |
| PATCH  | `/:id/clean-field` | Remove/clean specific field(s) from a profile by ID             |
| POST   | `/create`          | Create a new profile (with file upload for `photo`)             |
| PUT    | `/update/:id`      | Update a profile by ID (with file upload for `photo`)           |
| DELETE | `/delete/:id`      | Delete a profile by ID                                          |


## 📦 Dependencies

* **Express** – Web framework for Node.js.
* **Mongoose** – ODM for MongoDB.
* **Nodemon** – Auto-restart server during development.
* **dotenv** – Manage environment variables.
* **Multer** – Handle multipart/form-data(file uploads).

