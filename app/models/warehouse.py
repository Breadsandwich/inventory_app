from app.models.db import db

class Warehouse(db.Model):
    __tablename__ = 'warehouse'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(255), nullable=False, unique=True)

    inventory = db.relationship('Inventory', back_populates='warehouse')

    def to_dict(self):
        return {
            'id': self.id,
            'location': self.location,
            'warehouse_inventory': [items.to_dict() for  items in self.inventory]
        }
