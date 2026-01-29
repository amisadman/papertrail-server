# Papertrail Server

<div align="center">
  <img src="resources/papertrail.png" alt="Papertrail Logo" width="200"/>
  <p><em>A robust backend server for a modern blog and content management system.</em></p>
</div>

---

## Features

- **User Authentication**: Secure authentication powered by [Better-Auth](https://better-auth.com/).
- **Post Management**: Full CRUD operations for blog posts with support for tags, featured posts, and drafts.
- **Commenting System**: Interactive comments with nested replies (threading) and moderation control.
- **Admin Tools**: Built-in scripts for seeding admin accounts.
- **Type Safety**: Fully written in TypeScript with Prisma for end-to-end type safety.
- **Email Integration**: Integrated with Nodemailer for system notifications.

---

## Client Repository

The frontend client for this project is available at:
[https://github.com/amisadman/papertrail-client](https://github.com/amisadman/papertrail-client)


---

## Database Design

Below is the Entity-Relationship Diagram (ERD) representing the database structure:

```mermaid
erDiagram
    USER ||--o{ SESSION : "has"
    USER ||--o{ ACCOUNT : "has"
    USER ||--o{ POST : "authors"
    USER ||--o{ COMMENT : "writes"
    POST ||--o{ COMMENT : "contains"
    COMMENT ||--o{ COMMENT : "replies to"

    USER {
        string id PK
        string name
        string email UK
        boolean emailVerified
        string image
        string role
        string phone
        string status
        datetime createdAt
        datetime updatedAt
    }

    SESSION {
        string id PK
        string token UK
        datetime expiresAt
        string userId FK
        string ipAddress
        string userAgent
    }

    ACCOUNT {
        string id PK
        string accountId
        string providerId
        string userId FK
        string accessToken
        string refreshToken
        datetime accessTokenExpiresAt
    }

    POST {
        string id PK
        string title
        string content
        string thumbnail
        boolean isFeatured
        enum status
        string[] tags
        int views
        string authorId FK
        datetime createdAt
        datetime updatedAt
    }

    COMMENT {
        string id PK
        string content
        string authorId FK
        string postId FK
        string parentId FK
        enum status
        datetime createdAt
        datetime updatedAt
    }

    VERIFICATION {
        string id PK
        string identifier
        string value
        datetime expiresAt
    }
```

---


## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Auth**: [Better-Auth](https://better-auth.com/)
- **Logging**: [Morgan](https://github.com/expressjs/morgan)


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (preferred) or npm
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amisadman/papertrail-server.git
   cd papertrail-server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Setup environment variables:
   Create a `.env` file in the root directory and add your configuration (see `.env.example`).

4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

### Running the Application

- **Development Mode**:
  ```bash
  pnpm run dev
  ```

- **Seed Admin**:
  ```bash
  pnpm run seed:admin
  ```

---
