from flask import Blueprint, current_app, jsonify

# Crea un blueprint para el módulo de salud
health_bp = Blueprint('health', __name__)

@health_bp.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200