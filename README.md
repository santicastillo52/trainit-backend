# 🚀 Backend API - Trainit

Una API REST robusta y escalable construida con Node.js, Express, TypeScript y Prisma, diseñada para gestionar usuarios y autenticación de manera segura.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Base de Datos](#-base-de-datos)
- [Autenticación](#-autenticación)
- [Desarrollo](#-desarrollo)
- [Contribución](#-contribución)

## ✨ Características

- 🔐 **Autenticación JWT** con Passport.js
- 🛡️ **Validación de datos** con Joi
- 🔒 **Encriptación de contraseñas** con bcrypt
- 📊 **ORM Prisma** para MongoDB
- 🚀 **TypeScript** para desarrollo robusto
- 📝 **Validación de entrada** con middleware personalizado
- ⚡ **Rate limiting** para protección contra ataques
- 🎯 **Arquitectura modular** y escalable

## 🛠️ Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de Datos**: MongoDB
- **ORM**: Prisma
- **Autenticación**: Passport.js + JWT
- **Validación**: Joi
- **Encriptación**: bcrypt
- **Desarrollo**: ts-node-dev, nodemon

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd Backend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```

4. **Configura la base de datos**
   ```bash
   npm run prisma:generate
   npm run prisma:db:push
   ```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos
DATABASE_URL="mongodb://localhost:27017/users-trainit"

# JWT
JWT_SECRET="tu-secreto-jwt-super-seguro"
JWT_EXPIRES_IN="24h"

# Servidor
PORT=3000
NODE_ENV=development
```

### Base de Datos

El proyecto utiliza MongoDB con Prisma como ORM. Asegúrate de tener MongoDB ejecutándose localmente o configura una conexión remota.

## 🚀 Uso

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Ejecuta en modo desarrollo con hot-reload
npm run build        # Compila TypeScript a JavaScript
npm start            # Ejecuta la aplicación compilada

# Prisma
npm run prisma:generate    # Genera el cliente de Prisma
npm run prisma:studio      # Abre Prisma Studio
npm run prisma:db:push     # Sincroniza el esquema con la BD
```

### Iniciar la Aplicación

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start
```

La API estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/auth/register` | Registro de usuario |
| `POST` | `/auth/login` | Inicio de sesión |
| `POST` | `/auth/logout` | Cerrar sesión |

### Usuarios

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/users/profile` | Obtener perfil del usuario | ✅ |
| `PUT` | `/users/profile` | Actualizar perfil del usuario | ✅ |
| `DELETE` | `/users/profile` | Eliminar cuenta del usuario | ✅ |

### Ejemplos de Uso

#### Registro de Usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

#### Inicio de Sesión
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

## 🗄️ Base de Datos

### Modelo User

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Comandos de Prisma

```bash
# Sincronizar esquema con la base de datos
npm run prisma:db:push

# Generar cliente de Prisma
npm run prisma:generate

# Abrir Prisma Studio
npm run prisma:studio

# Ejecutar seeder (si está configurado)
npm run seed
```

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

1. **Registro**: El usuario se registra y recibe un token JWT
2. **Login**: El usuario inicia sesión y recibe un token JWT
3. **Protección**: Los endpoints protegidos verifican el token JWT
4. **Logout**: El token se invalida al cerrar sesión

### Middleware de Autenticación

```typescript
// Ejemplo de uso en rutas protegidas
router.get('/profile', authMiddleware, userController.getProfile);
```

## 🛠️ Desarrollo

### Estructura del Proyecto

```
src/
├── config/          # Configuraciones (Passport, etc.)
├── controllers/     # Controladores de la API
├── middleware/      # Middleware personalizado
├── providers/       # Proveedores de servicios
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── types/           # Tipos TypeScript
├── validations/     # Esquemas de validación
└── index.ts         # Punto de entrada
```

### Agregar Nuevas Rutas

1. Crea el controlador en `src/controllers/`
2. Define las validaciones en `src/validations/`
3. Crea la ruta en `src/routes/`
4. Registra la ruta en `src/index.ts`

### Validaciones

El proyecto utiliza Joi para validar los datos de entrada:

```typescript
// Ejemplo de validación
const userValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda, por favor:

- Abre un issue en el repositorio
- Contacta al equipo de desarrollo
- Revisa la documentación de Prisma y Express

---

**¡Gracias por usar nuestra API! 🎉**
