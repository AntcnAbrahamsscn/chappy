# Chappy Chat Application API

Chappy is a chat application that enables users to communicate through channels and direct messages (DMs). Guests can view open channels, while authenticated users can access private channels and send DMs.

---

## Table of Contents

-   [Project Overview](#project-overview)
-   [Tech Stack](#tech-stack)
-   [Data Models](#data-models)
    -   [User](#user)
    -   [Message](#message)
    -   [Channel](#channel)
-   [API Endpoints](#api-endpoints)
    -   [Channels](#channels)
    -   [Users](#users)
    -   [Messages](#messages)
-   [Setup](#setup)
-   [Features](#features)

---

## Project Overview

Chappy is built with the MERN stack to provide a real-time chat platform. It supports:

-   Viewing users and channels as guests.
-   Sending messages in open channels.
-   User authentication for private channel and DM access.
-   Basic account management (register, log in, delete).

The project uses JWT for authentication and is structured as a RESTful API.

---

## Tech Stack

-   **Backend**: Node.js, Express, MongoDB
-   **Frontend**: React, React Router
-   **Authentication**: JSON Web Tokens (JWT)
-   **Validation**: Joi
-   **State Management**: Zustand
-   **Deployment**: Render

---

## Data Models

### User

| Field      | Type     |
| ---------- | -------- |
| `_id`      | ObjectId |
| `username` | String   |
| `password` | String   |
| `gender`   | String   |

### Message

| Field      | Type     |
| ---------- | -------- | ---- |
| `_id`      | ObjectId |
| `sender`   | String   |
| `content`  | String   |
| `channel`  | String   | null |
| `directTo` | String   | null |
| `sentAt`   | Date     |

### Channel

| Field       | Type     |
| ----------- | -------- |
| `_id`       | ObjectId |
| `name`      | String   |
| `isPrivate` | Boolean  |

---

## 🔗 API Endpoints

### Channels

| Method | Endpoint             | Description                                                     |
| ------ | -------------------- | --------------------------------------------------------------- |
| GET    | `/api/channels/`     | Fetch all channels, with private channels if authenticated.     |
| GET    | `/api/channels/:id`  | Fetch details for a specific channel by ID.                     |
| GET    | `/api/channels/open` | (Pending) Fetch only open channels, no authentication required. |

### Users

| Method | Endpoint               | Description                                            |
| ------ | ---------------------- | ------------------------------------------------------ |
| GET    | `/api/users/`          | Get all users.                                         |
| POST   | `/api/users/:id`       | Log in with username and password to receive a JWT.    |
| GET    | `/api/users/protected` | Fetch protected data for logged-in users based on JWT. |

### Messages

| Method | Endpoint                             | Description                                             |
| ------ | ------------------------------------ | ------------------------------------------------------- |
| GET    | `/api/messages/:id`                  | Get messages from a specific channel.                   |
| GET    | `/api/messages/direct/:user1/:user2` | Fetch a private conversation between two users.         |
| POST   | `/api/messages`                      | Send a new message to a channel or as a direct message. |

## ✨ Features

-   **Guest Access**: Allows guests to view users and channels and participate in open channels.
-   **User Authentication**: Enables users to log in for access to private channels and direct messages.
-   **Real-Time Messaging**: Users can send and receive messages instantly within channels and direct messages.
-   **Channel Access Control**: Channels can be designated as open or private to restrict access.

> This project was developed as part of the **FED23 course at Handelsakademin**, focusing on building full-stack applications with the MERN stack.

---

## 🔄 To be continued.

To optimize the code, the application will be updated so that both channels and direct messages render within a unified chat room, reducing redundant code. Additionally, new features will be added to enhance user management and channel administration, including the ability to:

-   **Create, edit, and delete users**
-   **Add and remove channels**

These updates will make the application more flexible and efficient.
