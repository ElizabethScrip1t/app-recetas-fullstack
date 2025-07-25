# Documentación General del Proyecto

## Descripción General

Este proyecto es una aplicación fullstack para la gestión de recetas, desarrollada con Flask en el backend. El objetivo es proporcionar una API para la gestión de recetas, usuarios y otros recursos relacionados.

## Estructura del Proyecto

- `app/`: Contiene la aplicación principal de Flask.
  - `__init__.py`: Inicializa la app, configura la base de datos y registra los blueprints.
  - `models.py`: Aquí se definirán los modelos de la base de datos (actualmente vacío).
  - `routes.py`: Aquí se definirán las rutas/endpoints de la API (actualmente vacío).
- `run.py`: Archivo principal para ejecutar la aplicación (actualmente vacío).
- `README.md`: Información básica del proyecto.
- `documentacion.md`: Archivo de documentación.

## Configuración

- El proyecto utiliza variables de entorno, gestionadas con `python-dotenv`.
- La base de datos está configurada mediante SQLAlchemy y se espera una URL en la variable de entorno `DATABASE_URL`. Si no se encuentra, se usa por defecto:
  `postgresql://user:password@localhost:5432/recetasdb`
- CORS está habilitado para todas las rutas.

## Modelos

Actualmente, el archivo `models.py` está vacío. Aquí se definirán los modelos de la base de datos utilizando SQLAlchemy.

## API (Endpoints)

Actualmente, el archivo `routes.py` está vacío. Aquí se definirán los endpoints de la API utilizando Blueprints de Flask.

## Estado Actual

- Inicialización de la aplicación Flask y configuración de la base de datos listas.
- Falta definir modelos y rutas/endpoints.

---

> Esta documentación se irá actualizando a medida que se implementen los modelos y la API.
