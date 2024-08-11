
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
