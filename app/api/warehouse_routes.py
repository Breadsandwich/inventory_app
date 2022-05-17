from flask import Blueprint, request, render_template, redirect
import psycopg2
from datetime import datetime
from app.forms.warehouse_form import WarehouseForm
from app.models import Warehouse, db

warehouse_routes = Blueprint('warehouses', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages


@warehouse_routes.route('/new', methods=['GET', 'POST'])
def create_warehouse():
    form = WarehouseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_warehouse = Warehouse(
            location=data['location']
        )

        db.session.add(new_warehouse)
        db.session.commit()

        return {**new_warehouse.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@warehouse_routes.route('/all', methods=['GET'])
def get_all_warehouses():
    all_warehouses = Warehouse.query.all()

    return {"all_warehouses": [warehouse.to_dict() for warehouse in all_warehouses]}


@warehouse_routes.route('/<int:warehouseId>', methods=['GET'])
def get_one_warehouse(warehouseId):
    warehouse = Warehouse.query.get(warehouseId)

    return {**warehouse.to_dict()}
