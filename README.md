This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# Steps to start the development app

1. Lunch the development BBDD:
```
    docker compose up -d
```
2. Renombrar el env.template a .env

3. Reemplazar las variables de entorno

4. Run the development server:

```
    bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. Ejecutar el API Seed para llenar la tabla Todo con datos de prueba
    ```
    http://localhost:3000/api/seed
    ```

# Prisma commands
```
    npx prisma init --datasource-provider PostgreSQL
    npx prisma migrate dev
    npx prisma generate


Loaded Prisma config from prisma.config.ts.


Initialized Prisma in your project

  prisma/
    schema.prisma
    prisma.config.ts

warn Prisma would have added DATABASE_URL but it already exists in .env.
warn You already have a .gitignore file. Don't forget to add .env in it to not commit any private information.

Next, choose how you want to set up your database:

CONNECT EXISTING DATABASE:
  1. Configure your DATABASE_URL in prisma.config.ts
  2. Run prisma db pull to introspect your database.

CREATE NEW DATABASE:
  Local: npx prisma dev (runs Postgres locally in your terminal)
  Cloud: npx create-db (creates a free Prisma Postgres database)

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.

Learn more: https://pris.ly/getting-started
```

