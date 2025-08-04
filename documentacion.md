# Documentación del Proyecto App Recetas Fullstack

## Descripción General

Este proyecto es una aplicación fullstack completa para la gestión de recetas de cocina, desarrollada con **Flask** en el backend y **React** en el frontend. La aplicación permite a los usuarios crear, ver, editar y eliminar recetas, así como filtrarlas por categorías.

## Estructura del Proyecto

```
app-recetas-fullstack/
├── backend/                 # Backend en Flask
│   ├── app/
│   │   ├── __init__.py     # Configuración de la aplicación Flask
│   │   ├── models.py       # Modelos de base de datos
│   │   └── routes.py       # Endpoints de la API
│   ├── instance/
│   │   └── recetas.db      # Base de datos SQLite
│   └── run.py              # Archivo principal para ejecutar el servidor
├── frontend/               # Frontend en React
│   ├── public/
│   │   ├── index.html
│   │   └── melove-logo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── RecipeCard.js    # Componente para mostrar recetas
│   │   │   └── RecipeForm.js    # Componente para formularios
│   │   ├── App.js              # Componente principal
│   │   └── App.css             # Estilos de la aplicación
│   └── package.json
└── documentacion.md        # Este archivo
```

## Backend (Flask)

### Configuración

- **Framework**: Flask con SQLAlchemy para ORM
- **Base de datos**: SQLite (archivo `recetas.db`)
- **CORS**: Habilitado para todas las rutas
- **Puerto**: 5000 (por defecto)

### Modelos

#### Recipe
```python
class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
```

### API Endpoints

#### GET /recipes
- **Descripción**: Obtiene todas las recetas o filtra por categoría
- **Parámetros de query**:
  - `category` (opcional): Filtra recetas por categoría
- **Respuesta**: Array de objetos receta en formato JSON

#### POST /recipes
- **Descripción**: Crea una nueva receta
- **Body** (JSON):
  ```json
  {
    "title": "string",
    "description": "string", 
    "ingredients": "string",
    "instructions": "string",
    "category": "string",
    "image_url": "string (opcional)"
  }
  ```
- **Respuesta**: Objeto receta creado

#### PUT /recipes/{id}
- **Descripción**: Actualiza una receta existente
- **Body**: Mismo formato que POST
- **Respuesta**: Objeto receta actualizado

#### DELETE /recipes/{id}
- **Descripción**: Elimina una receta
- **Respuesta**: Status 204 (sin contenido)

### Comandos CLI

```bash
# Crear las tablas de la base de datos
flask create-db

# Eliminar las tablas de la base de datos
flask drop-db
```

## Frontend (React)

### Tecnologías

- **Framework**: React 19.1.0
- **Scripts**: React Scripts 5.0.1
- **Puerto**: 3000 (por defecto)

### Componentes

#### App.js
- Componente principal que maneja el estado global
- Gestiona la comunicación con la API del backend
- Implementa filtrado por categorías
- Maneja la visualización del formulario de recetas

#### RecipeForm.js
- Formulario para crear y editar recetas
- Campos: título, descripción, ingredientes, instrucciones, categoría, URL de imagen
- Validación de campos requeridos
- Modo de creación y edición

#### RecipeCard.js
- Tarjeta para mostrar información de una receta
- Incluye imagen, título, categoría, descripción, ingredientes e instrucciones
- Botones para editar y eliminar

### Categorías Disponibles

- Postres
- Platos Fuertes
- Desayunos
- Ensaladas
- Bebidas

### Funcionalidades

- ✅ Listar todas las recetas
- ✅ Filtrar recetas por categoría
- ✅ Crear nuevas recetas
- ✅ Editar recetas existentes
- ✅ Eliminar recetas
- ✅ Interfaz responsive y moderna
- ✅ Validación de formularios
- ✅ Manejo de errores

## Instalación y Configuración

### Backend

1. **Navegar al directorio del backend**:
   ```bash
   cd backend
   ```

2. **Crear entorno virtual**:
   ```bash
   python -m venv venv
   ```

3. **Activar entorno virtual**:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

4. **Instalar dependencias**:
   ```bash
   pip install flask flask-sqlalchemy flask-cors
   ```

5. **Crear la base de datos**:
   ```bash
   flask create-db
   ```

6. **Ejecutar el servidor**:
   ```bash
   python run.py
   ```

### Frontend

1. **Navegar al directorio del frontend**:
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```

## Uso de la Aplicación

1. **Iniciar el backend** (puerto 5000)
2. **Iniciar el frontend** (puerto 3000)
3. **Acceder a la aplicación** en `http://localhost:3000`
4. **Usar las funcionalidades**:
   - Ver todas las recetas
   - Filtrar por categoría usando la barra de categorías
   - Añadir nueva receta con el botón "Añadir Nueva Receta"
   - Editar recetas existentes con el botón "Editar"
   - Eliminar recetas con el botón "Eliminar"

## Estado Actual del Proyecto

### ✅ Completado
- Backend completamente funcional con API REST
- Frontend con interfaz moderna y responsive
- CRUD completo de recetas
- Filtrado por categorías
- Base de datos SQLite configurada
- CORS habilitado
- Manejo de errores básico

### 🔄 En Desarrollo
- Mejoras en la interfaz de usuario
- Validaciones adicionales
- Optimizaciones de rendimiento

### 📋 Futuras Mejoras
- Sistema de autenticación de usuarios
- Subida de imágenes
- Búsqueda de recetas
- Favoritos de usuarios
- Comentarios en recetas
- API más robusta con paginación

---

> Esta documentación se actualiza regularmente conforme evoluciona el proyecto.
