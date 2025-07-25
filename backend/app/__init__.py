import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app) # Habilitar CORS para todas las rutas

    # Configuración de la base de datos para SQLite
    # El archivo recetas.db se creará en la raíz de la carpeta backend/
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///recetas.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Importar y registrar blueprints (rutas)
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app