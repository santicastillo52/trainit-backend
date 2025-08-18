# Backend API

## Base de Datos

Este proyecto utiliza MongoDB con Prisma como ORM.

### Modelo User

El modelo User incluye los siguientes campos:
- `id`: Identificador único (ObjectId de MongoDB)
- `name`: Nombre del usuario
- `email`: Email único del usuario
- `password`: Contraseña del usuario
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

### Comandos de Prisma

```bash
# Sincronizar esquema con la base de datos (MongoDB)
npm run prisma:db:push

# Generar cliente de Prisma
npm run prisma:generate

# Abrir Prisma Studio
npm run prisma:studio

# Ejecutar seeder
npm run seed
```

### Seeder

El seeder crea usuarios de ejemplo en la base de datos:

- Juan Pérez (juan.perez@example.com)
- María García (maria.garcia@example.com)
- Carlos López (carlos.lopez@example.com)

Para ejecutar el seeder:

```bash
npm run seed
```

## Variables de Entorno

Asegúrate de tener un archivo `.env` con:

```
DATABASE_URL="mongodb://localhost:27017/users-trainit"
```
