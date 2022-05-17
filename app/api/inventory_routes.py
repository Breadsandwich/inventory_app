from flask import Blueprint, request
from app.forms.inventory_form import InventoryForm
from app.models import Inventory, db

inventory_routes = Blueprint('inventory', __name__)


def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages


# CRUD routes

@inventory_routes.route('/new', methods=['POST'])
def create_item():
    data = request.json

    new_item = Inventory(
            item_name=data['item_name'],
            description=data['description'],
            price=data['price'],
            quantity=data['quantity'],
            warehouse_id=data['warehouse_id']
        )

    db.session.add(new_item)
    db.session.commit()

    return {**new_item.to_dict()}



@inventory_routes.route("/all", methods=["GET"])
def get_all_items():
    all_items = Inventory.query.all()

    return {"all_items": [item.to_dict() for item in all_items]}


@inventory_routes.route("/<int:itemId>", methods=["GET"])
def get_one_item(itemId):
    one_item = Inventory.query.get(itemId)

    return {**one_item.to_dict()}


@inventory_routes.route("/<int:itemId>", methods=['PUT'])
def update_item(itemId):
    data = request.json

    item = Inventory.query.get(itemId)
    item.item_name = data['item_name']
    item.description = data['description']
    item.price = data['price']
    item.quantity = data['quantity']
    item.warehouse_id = data['warehouse_id']

    db.session.commit()

    return {**item.to_dict()}


@inventory_routes.route("/<int:itemId>", methods=['DELETE'])
def delete_item(itemId):
    item = Inventory.query.get(itemId)
    db.session.delete(item)
    db.session.commit()

    return f'Deleted item Id: {itemId}'




'''
JSON format copy-paste for testing purposes

create route

{
    "item_name": "test item",
    "description": "secret test item.",
    "price": "7.00",
    "quantity": 5,
    "warehouse_id": 1

}

update route

{
    "item_name": "test updated item",
    "description": "secret test item. updated",
    "price": "2.50",
    "quantity": 8
    "warehouse_id": 1
}

'''
