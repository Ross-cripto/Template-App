from flask import Blueprint
import logging
from core.modules.user.controllers.controller import get_users, google_login

"""
    Blueprint definition for the users module.

    This file defines the routes for user authentication and retrieval,
    mapping URL endpoints to their corresponding controller functions.
"""

users_bp = Blueprint("users/", __name__)

@users_bp.route("/users/google", methods=["POST"])
def google_login_route():
    return google_login()

@users_bp.route("/users", methods=["GET"])
def get_users_route():
    return get_users()
