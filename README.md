<img src="apps/web/public/sketch1704618933812two - Copy.png" alt="logo" width="200" height="200">

# ChatDoc

## Introduction

ChatDoc is a [brief description of the project].

## Getting Started

To get started with ChatDoc, follow these steps:

## Clone the Repository

```bash
git clone git@github.com:Maheshwarreddy970/chatdoc.git
```

```bash
cd chatdoc
```

## Environment Variables

Before running the application, set up the environment variables. Rename `.env.example to .env ` and set your own variables.

```bash
mv .env.example .env
nano .env  # (or use any text editor to modify .env)
```

### .env.example

Here is an example of the environment variables needed for the project. Replace the placeholder values with your actual credentials.

```bash
# Kinde configuration

KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your_kinde_issuer_url
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

# OpenAI configuration

OPENAI_API_KEY=your_openai_api_key

# AWS S3 configuration

NEXT_PUBLIC_S3_ACCESS_KEY_ID=your_aws_s3_access_key_id
NEXT_PUBLIC_S3_BUCKET_NAME=your_aws_s3_bucket_name
NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=your_aws_s3_secret_access_key

# Pinecone configuration

PINECONE_KEY=your_pinecone_key
```

Make sure to fill in the necessary environment variables in the .env file.

## Install Dependencies

```bash
yarn install
```

## Development

To start the development server:

```bash
yarn turbo dev or yarn dev
```

This will run the application in development mode.

## Chatdocrepo File Structure

ChatDoc uses a monorepo setup managed by Turborepo and includes a Next.js application. Below is an overview of the file structure:

```bash

chatdoc/
├── apps/
│ └── web/ # Next.js application
│ ├── public/ # Public assets
│ ├── pages/ # Next.js pages
│ ├── components/ # React components
│ ├── styles/ # Global styles
│ ├── utils/ # Utility functions
│ ├── hooks/ # Custom hooks
│ ├── next.config.js # Next.js configuration
│ └── tsconfig.json # TypeScript configuration
├── packages/
│ ├── ui/ # Shared UI components package
│ │ ├── src/ # Source code for UI components
│ │ ├── index.ts # Entry point for UI components
│ │ └── package.json # Package configuration
│ ├── database/ # Database package
│ │ ├── prisma/ # Prisma schema and migrations
│ │ ├── src/ # Database access code
│ │ ├── index.ts # Entry point for the database package
│ │ └── package.json # Package configuration
│ └── trpc/ # TRPC package
│ ├── src/ # Source code for TRPC
│ │ ├── config/ # TRPC configuration
│ │ │ └── trpc.ts # TRPC setup and initialization
│ │ ├── zod/ # Zod schemas
│ │ ├── index.ts # Entry point for TRPC
│ └── package.json # Package configuration
├── .env.example # Example environment variables
├── .gitignore # Git ignore file
├── package.json # Root package configuration
├── turbo.json # Turborepo configuration
└── README.md # Project documentation
```

## TRPC Configuration

`packages/trpc/src/config/trpc.ts`
This file sets up and initializes the TRPC configuration.

```bash
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../routers/\_app';

export const trpc = createTRPCNext<AppRouter>({
config() {
return {
url: '/api/trpc',
};
},
ssr: true,
});
```

`packages/trpc/src/zod/index.ts`

```bash
Zod schemas for validation.
import { z } from 'zod';
```

export const exampleSchema = z.object({
exampleField: z.string().min(1),
});

`packages/trpc/src/index.ts`

```bash
export \* from './config/trpc';
```
