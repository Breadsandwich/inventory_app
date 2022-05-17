from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired



class WarehouseForm(FlaskForm):
    location = StringField('Warehouse Location', validators=[DataRequired()])
    submit = SubmitField('Submit')
    cancel = SubmitField('Cancel')
