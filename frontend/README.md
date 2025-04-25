# 📋 Frontend - Gestor de Tareas

Este es el frontend de la aplicación Gestor de Tareas, desarrollada con Next.js. Este proyecto está diseñado para interactuar con el backend de la aplicación y proporcionar una interfaz de usuario para gestionar tareas.

---

## 💻 Tecnologías
-Next.js
-React
-Tailwind CSS
-JWT (JSON Web Tokens) para autenticación

---

## 🚀 Instalación
Clona este repositorio:

git clone https://github.com/tuusuario/nombre-del-repositorio.git
cd nombre-del-repositorio

Instala las dependencias:

Si usas npm:
npm install

O si usas yarn:
yarn install

Ejecuta el proyecto en modo desarrollo:

Si usas npm:
npm run dev

O si usas yarn:
yarn dev

Luego, abre http://localhost:3000 en tu navegador para ver la aplicación.

---

## 🧑‍💻 Funcionalidades
-Autenticación: Los usuarios pueden iniciar sesión para acceder a sus tareas. Los tokens JWT son gestionados para mantener la sesión del usuario.
-Gestión de tareas: Los usuarios pueden agregar, editar y eliminar tareas.
-Interacción con el Backend: El frontend interactúa con el backend a través de una API RESTful, enviando solicitudes para crear, actualizar y eliminar tareas.

---

## 🗂️ Estructura del Proyecto
/frontend
  /app
    /dashboard        # Página principal de usuario autenticado
    /register         # Página de registro de usuario
    /users            # Página para gestionar la información del usuario
    layout.jsx        # Estructura principal del layout
    page.jsx          # Página principal de la aplicación
  /components         # Componentes reutilizables
    Footer.jsx        # Componente para el pie de página
    Header.jsx        # Componente para el encabezado
    ModalTareas.jsx   # Componente para agregar/editar tareas
    Tareas.jsx        # Componente para mostrar tareas
    TareasBox.jsx     # Componente para mostrar tareas
  /lib                # Funciones y utilidades
    api.js            # Funciones para interactuar con el backend (API REST)
  /public             # Archivos estáticos (imágenes, fuentes, etc.)
  /styles             # Estilos (CSS, Tailwind, etc.)

---

## 🧪 Autenticación
Este proyecto utiliza JSON Web Tokens (JWT) para gestionar la autenticación de usuarios. El token se envía en el header de las solicitudes para acceder a los endpoints protegidos:

Header:
Authorization: Bearer <token_jwt>

---

## ⚙️ Interacción con el Backend
El frontend interactúa con el backend mediante una API RESTful. Algunos ejemplos de los endpoints con los que se comunica el frontend:

-POST /api/users/login - Iniciar sesión para obtener el token JWT.
-GET /api/tasks - Obtener todas las tareas del usuario autenticado.
-POST /api/tasks - Crear una nueva tarea.
-PUT /api/tasks/:id - Actualizar una tarea existente.
-DELETE /api/tasks/:id - Eliminar una tarea.

El frontend maneja estas interacciones a través de funciones definidas en el archivo lib/api.js.
     
