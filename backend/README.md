# 📋 Bakcend - Gestor de Tareas

Esta API permite gestionar tareas y usuarios mediante autenticación con JWT. Con ella podés:

- Registrar usuarios
- Iniciar sesión
- Crear, leer, actualizar y eliminar tareas

---
## 💻 Tecnologías

- Node.js
- Express
- JWT (JSON Web Tokens)
- MySQL

---
## 🚀 Instalación

1. Clona este repositorio.
2. Navega hasta la carpeta del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Configura las variables de entorno (por ejemplo, en un archivo `.env`).
5. Inicia el servidor con `node server`.

---
## 🧪 Autenticación

Autenticación mediante JSON Web Tokens (JWT). Se debe enviar el token en el header:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature

---
## 🧍‍♂️ Endpoints de Usuario

### 📝 Registrar usuario
**POST** `/api/users`

Crea un nuevo usuario.

**Body (JSON):**
```json
{
  "nombre": "Maria",
  "apellido": "Gomez",
  "mail": "maria@gmail.com",
  "contraseña": "maria1234"
}
```

**Respuestas:**
- `201 Created`: Usuario creado.
- `400 Bad Request`: Validación incorrecta.

### 🔐 Iniciar sesión
**POST** `/api/users/login`

Autentica al usuario y devuelve un token JWT.

**Body (JSON):**
```json
{
  "mail": "maria@gmail.com",
  "contraseña": "maria1234"
}
```

**Respuestas:**
- `200 OK`: Devuelve el token JWT.
- `401 Unauthorized`: Credenciales inválidas.

### 🔍 Obtener todos los usuarios (🔒 Protegido)
**GET** `/api/users`
🔒 Endpoints protegidos: requieren incluir un token JWT válido en el header de autorización.

Devuelve todos los usuarios registrados.

**Headers:**
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature
> Este token es solo un ejemplo. Debe ser reemplazado por uno real obtenido al iniciar sesión.

**Respuestas:**
- `200 OK`: Lista de usuarios.
- `401 Unauthorized`: Token faltante o inválido.

### 🔄 Actualizar usuario (🔒 Protegido)
**PUT** `/api/users/:id`
🔒 Endpoints protegidos: requieren incluir un token JWT válido en el header de autorización.

Descripción: Actualiza la información de un usuario existente.

**Headers:**
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature
> Este token es solo un ejemplo. Debe ser reemplazado por uno real obtenido al iniciar sesión.

**Body (JSON):**
```json
{
  "nombre": "NuevoNombre",
  "apellido": "NuevoApellido",
  "mail": "nuevoemail@ejemplo.com",
  "contraseña": "nuevacontraseña123"
}
```

**Respuestas:**
- `200 OK`: Usuario actualizado con éxito.
- `400 Bad Request`: Datos inválidos.
- `401 Unauthorized`: Token no válido o ausente.
- `404 Not Found`: Usuario no encontrado.

### 🗑️ Eliminar usuario (🔒 Protegido)
**DELETE** `/api/users/:id`
🔒 Endpoints protegidos: requieren incluir un token JWT válido en el header de autorización.

Descripción: Elimina un usuario por su ID.

**Headers:**
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature
> Este token es solo un ejemplo. Debe ser reemplazado por uno real obtenido al iniciar sesión.

**Respuestas:**
- `200 OK`: Usuario eliminado con éxito.
- `401 Unauthorized`: Token no válido o ausente.
- `404 Not Found`: Usuario no encontrado.

---
## 🧍‍♂️ Endpoints de Tareas
### 📝 Crear tarea (🔒 Protegido)
**POST** `/api/tasks`
🔒 Endpoints protegidos: requieren incluir un token JWT válido en el header de autorización.

Crea una nueva tarea para un usuario.

**Body (JSON):**
```json
{
  "titulo": "Comprar leche",
  "descripcion": "Ir al supermercado a comprar leche",
  "categoria": "otro",
  "estado": "pendiente",
}
```
**Respuestas:**
- `201 Created`: Tarea creada con éxito.
- `400 Bad Request`: Datos inválidos.

### 🔍 Obtener todas las tareas (🔒 Protegido)
**GET** `/api/tasks`
🔒 Endpoints protegidos: requieren incluir un token JWT válido en el header de autorización.

Devuelve todas las tareas del usuario autenticado.

**Headers:** 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature
>Este token es solo un ejemplo. Debe ser reemplazado por uno real obtenido al iniciar sesión.

**Respuestas:**
- `200 OK`: Lista de tareas.
- `401 Unauthorized`: Token faltante o inválido.

### 🔄 Actualizar tarea (🔒 Protegido)
**PUT** `/api/tasks/:id`
🔒 Endpoints protegidos: requieren incluir un token JWT válido en el header de autorización.

Actualiza la información de una tarea existente.

**Headers:** 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature
>Este token es solo un ejemplo. Debe ser reemplazado por uno real obtenido al iniciar sesión.

**Body (JSON):**
```json
{
  "titulo": "Comprar pan",
  "descripcion": "Ir a la panadería a comprar pan",
  "estado": "completada",
  "fecha_vencimiento": "2025-04-29T12:00:00Z"
}
```
**Respuestas:**
- `200 OK`: Tarea actualizada con éxito.
- `400 Bad Request`: Datos inválidos.
- `401 Unauthorized`: Token no válido o ausente.
- `404 Not Found`: Tarea no encontrada.

### 🗑️ Eliminar tarea (🔒 Protegido)
**DELETE** `/api/tasks/:id`
🔒 Endpoints protegidos: requieren incluir un token JWT válido en el header de autorización.

Elimina una tarea por su ID.

**Headers:** 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature
>Este token es solo un ejemplo. Debe ser reemplazado por uno real obtenido al iniciar sesión.

**Respuestas:**
- `200 OK:` Tarea eliminada con éxito.
- `401 Unauthorized:` Token no válido o ausente.
- `404 Not Found:` Tarea no encontrada.

