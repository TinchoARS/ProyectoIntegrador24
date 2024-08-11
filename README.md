# Proyecto Integrador

## Descripción

Este proyecto es una aplicación web que permite a los usuarios registrarse, iniciar sesión y acceder a un perfil personalizado. La aplicación también incluye un carrusel de noticias y categorías populares. Está construido utilizando React, Bootstrap y otras tecnologías modernas.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

ProyectoIntegrador24/ ├── public/ ├── src/ │ ├── assets/ │ │ ├── Caroulsel.css │ │ └── profile.jpg │ ├── components/ │ │ ├── CarouselPage.jsx │ │ ├── Header.jsx │ │ ├── Home.jsx │ │ ├── Login.jsx │ │ ├── SubHeader.jsx │ │ └── ... │ ├── context/ │ │ └── AuthProvider.jsx │ ├── services/ │ │ └── authService.js │ ├── App.js │ ├── index.js │ └── ... ├── .gitignore ├── package.json ├── README.md └── ...



## Endpoints

### Autenticación

- **POST /login**: Inicia sesión en la aplicación.
  - Request Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "string" }`

- **POST /register**: Registra un nuevo usuario.
  - Request Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

### Perfil

- **GET /profile**: Obtiene la información del perfil del usuario autenticado.
  - Headers: `{ "Authorization": "Bearer <token>" }`
  - Response: `{ "username": "string", "email": "string", ... }`

## Funcionalidades

### Autenticación de Usuarios

- **Registro**: Permite a los nuevos usuarios crear una cuenta.
- **Inicio de Sesión**: Permite a los usuarios existentes iniciar sesión en la aplicación.
- **Protección de Rutas**: Solo los usuarios autenticados pueden acceder a ciertas rutas.

### Carrusel de Noticias

- **Visualización de Noticias**: Muestra un carrusel con las noticias más recientes.
- **Categorías Populares**: Muestra las categorías más populares y relevantes.

### Perfil de Usuario

- **Visualización del Perfil**: Permite a los usuarios ver su información de perfil.
- **Edición del Perfil**: Permite a los usuarios actualizar su información de perfil.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ProyectoIntegrador24.git
   Navega al directorio del proyecto:
     cd ProyectoIntegrador24
   Instala las dependencias:
   npm install
   Inicia la aplicación:
   npm start

Tecnologías Utilizadas
React: Biblioteca de JavaScript para construir interfaces de usuario.
Bootstrap: Framework CSS para diseño responsivo.
React-Bootstrap: Componentes de Bootstrap para React.
React Router: Librería para manejo de rutas en React.
Context API: Manejo de estado global en React.
Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Agrega nueva funcionalidad').
Sube tus cambios a tu fork (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.
Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

```
