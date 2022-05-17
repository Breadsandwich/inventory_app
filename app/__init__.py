import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf

from .models import db
from .api.inventory_routes import inventory_routes
from .api.warehouse_routes import warehouse_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(inventory_routes, url_prefix='/api/inventory')
app.register_blueprint(warehouse_routes, url_prefix='/api/warehouses')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)



@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response
