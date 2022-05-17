from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DecimalField, SelectField
from wtforms.validators import DataRequired


class InventoryForm(FlaskForm):
    item_name = StringField('Item Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    submit = SubmitField('Submit')
    cancel = SubmitField('Cancel')
