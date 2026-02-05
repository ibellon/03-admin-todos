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

## Guía de Primeros Auxilios Prisma

1. npx prisma generate: Regenera el cliente de TypeScript en node_modules. Hazlo siempre que cambies el schema.prisma.

2. npx prisma db push: Fuerza a la base de datos a tener las tablas que dice tu esquema. Es ideal para desarrollo (en producción usarás prisma migrate dev).

3. rm -rf .next: Borra la caché de compilación de Next.js. Es la culpable de que errores viejos sigan saliendo aunque ya hayas corregido el código.

4. npx prisma studio: (Extra) Te abre una interfaz web para ver y editar tus datos manualmente. Muy útil para comprobar si el findMany falla por falta de datos o por código.

5. Archivo .env: Debe estar en la raíz del proyecto. Sin la variable DATABASE_URL, nada de lo anterior funcionará.

6. Singleton de Prisma: El archivo lib/prisma.ts TIENE que usar el objeto global para no saturar las conexiones de la base de datos durante el desarrollo.

7. Schema Limpio: El bloque generator client no debe tener un output personalizado a menos que sepas muy bien lo que haces; mejor dejar que Prisma se guarde en su sitio por defecto (node_modules).


