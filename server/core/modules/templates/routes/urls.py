from flask import Blueprint
import logging
from core.modules.templates.controllers.controller import create_template, get_templates

"""
    Blueprint definition for the templates module.

    This file defines the routes for interacting with templates,
    mapping URL endpoints to their corresponding controller functions.
"""

templates_bp = Blueprint("templates", __name__)



@templates_bp.route("/templates", methods=["POST"])
def create_template_route():
    return create_template()

@templates_bp.route("/templates", methods=["GET"])
def get_templates_route():
    return get_templates()
