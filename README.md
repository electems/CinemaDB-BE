# Ciname DBs  

Provide the Back end APIs for this applications

## Usage

### run locally

#### Since our prisma schemas are split within modules, we will have to merge them all in one file prisma can understand. Let's do just that

```bash
yarn prisma-merge
```

#### Now, we need to tell prisma to generate in node_modules the code actually allowing us to interact with the database

```bash
yarn prisma-gen
```

#### Add all the required initialization database records to the DB

```bash
yarn prisma-seed
```

#### Launch the backend in dev

```bash
yarn dev
```

#### You can do the merge, gen & seed steps all at once using the following command

```bash
yarn dev-db
```

## Guidelines

### Schema splitting

We do not want a huge prisma schema. Group the prisma file by module, see user module 

## Subjects

### Authentication

Its based on jwt authentication.
