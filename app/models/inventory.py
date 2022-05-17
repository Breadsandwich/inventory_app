from app.models.db import db

class Inventory(db.Model):
    __tablename__ = 'inventory'

    id = db.Column(db.Integer, primary_key=True)
    warehouse_id = db.Column(db.Integer, db.ForeignKey("warehouse.id"), nullable=False)
    item_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    warehouse = db.relationship("Warehouse", back_populates="inventory")

    def to_dict(self):
        return {
            'id': self.id,
            'item_name': self.item_name,
            'description': self.description,
            'price': str(self.price),
            'quantity': str(self.quantity),
            'warehouse_id': self.warehouse_id,
        }
