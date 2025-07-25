from app import db # Importamos la instancia de db desde __init__.py

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False) # Podríamos hacer una tabla separada para esto más adelante
    instructions = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    image_url = db.Column(db.String(255), nullable=True) # Para la URL de una imagen

    def __repr__(self):
        return f'<Recipe {self.title}>'

    # Método para serializar el objeto a un diccionario (útil para respuestas JSON)
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'category': self.category,
            'image_url': self.image_url
        }