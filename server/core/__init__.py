from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from .config.base import config
from .modules.user.routes.urls import users_bp
from .modules.templates.routes.urls import templates_bp
from .utils.ping import health_bp
import logging

# Configure basic logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logging.info("Starting application setup...")

"""
    File to create and configure the Flask application.

    This script handles the creation of the Flask app instance,
    loads environment-specific configurations, sets up Cross-Origin
    Resource Sharing (CORS), initializes the MongoDB connection,
    and registers the application's blueprints (routes).
"""

mongo = PyMongo()

def create_app(env='default'):

    app = Flask(__name__)

    app.config.from_object(config[env])

    CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
        "supports_credentials": True
    }
})

    mongo.init_app(app)
    app.mongo = mongo
    logging.info("PyMongo initialized with the Flask app.")

    app.register_blueprint(users_bp, url_prefix='/api/v1')
    app.register_blueprint(templates_bp, url_prefix='/api/v1')
    app.register_blueprint(health_bp) 
    
    logging.info("Blueprints registered. Available routes:")
    for rule in app.url_map.iter_rules():
        logging.info(f"Route: {rule}")

    return app