from flask import jsonify, request, current_app
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from itsdangerous import URLSafeTimedSerializer
import logging

def google_login():
    """
    Endpoint for Google login.

    Verifies the Google ID token sent in the request body.
    If the token is valid, it checks if the user exists in the database.
    If the user exists, it returns the user data and an application-specific token.
    If the user doesn't exist, it creates a new user in the database and returns the user data and an application token.

    Returns:
        tuple: A JSON response containing user data (including an application token) and a 200 or 201 status code on success.
        An error message and a 400 status code if the Google token is not provided.
        An error message and a 401 status code if the Google token is invalid.
        An error message and a 500 status code for internal server errors.
    """
    try:
        data = request.get_json()
        token = data.get("token")

        if not token:
            return jsonify({"message": "Token de Google no proporcionado"}), 400

        try:
            idInfo = id_token.verify_oauth2_token(
                token, google_requests.Request(), None
            )
            logging.debug(f"Decoded Google ID token information: {idInfo}")

            # Check if the token issuer is Google.
            if idInfo["iss"] not in [
                "accounts.google.com",
                "https://accounts.google.com",
            ]:
                logging.error(f"Invalid token issuer: {idInfo['iss']}")
                raise ValueError("Wrong issuer.")

            user_id = idInfo["sub"]
            email = idInfo.get("email")
            name = idInfo.get("name")
            picture = idInfo.get("picture")

            users_collection = current_app.mongo.db.users

            user = users_collection.find_one({"googleId": user_id})

            if user:
                response_data = {
                    "_id": str(user["_id"]),
                    "name": user["name"],
                    "email": user["email"],
                    "picture": user.get("picture"),
                }
                # Generate an application-specific token using itsdangerous.
                serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
                app_token = serializer.dumps({"user_id": str(user["_id"])})
                response_data["token"] = app_token
                logging.info(
                    f"Application token generated for existing user ID: {user['_id']}"
                )
                return jsonify(response_data), 200
            else:
                logging.info(
                    f"New user with Google ID: {user_id} not found. Creating new user."
                )
                new_user = {
                    "googleId": user_id,
                    "email": email,
                    "name": name,
                    "picture": picture,
                }
                inserted_user = users_collection.insert_one(new_user)
                logging.info(f"New user created with ID: {inserted_user.inserted_id}")
                response_data = {
                    "_id": str(inserted_user.inserted_id),
                    "name": name,
                    "email": email,
                    "picture": picture,
                }
                # Generate an application-specific token for the new user.
                serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
                app_token = serializer.dumps(
                    {"user_id": str(inserted_user.inserted_id)}
                )
                response_data["token"] = app_token
                logging.info(
                    f"Application token generated for new user ID: {inserted_user.inserted_id}"
                )
                return jsonify(response_data), 201

        except ValueError:
            logging.error("Invalid Google ID token received.")
            return jsonify({"message": "Token de Google inválido"}), 401

    except Exception as e:
        logging.error(f"Error during Google login process: {e}")
        return jsonify({"message": "Error interno del servidor"}), 500


def get_users():
    """
    Endpoint to retrieve all users.

    Fetches all documents from the 'users' collection in MongoDB.

    Returns:
        jsonify: A JSON response containing a list of all users. Each user
        includes their '_id', 'name', 'email', and 'picture' (if available).
    """

    users_collection = current_app.mongo.db.users

    users = list(users_collection.find())

    user_list = []

    for user in users:
        user_list.append(
            {
                "_id": str(user["_id"]),
                "name": user.get("name"),
                "email": user.get("email"),
                "picture": user.get("picture"),
            }
        )

    return jsonify(user_list)
