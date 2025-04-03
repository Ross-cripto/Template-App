from flask import jsonify, request, current_app
import logging

def create_template():
    """
    Endpoint to create a new template.

    Receives template data (name and fields) in the request body as JSON.
    Inserts the new template into the 'templates' collection in MongoDB.

    Returns:
        tuple: A JSON response containing the details of the created template and a 201 status code on success.
        An error message and a 400 status code if required fields are missing.
        An error message and a 500 status code for internal server errors.
    """
    try:
        data = request.get_json()
        name = data.get("name")
        fields = data.get("fields")
        
        if not name or not fields:
            logging.warning(
                "Template creation failed: 'name' and 'fields' are required."
            )
            return (
                jsonify({"message": "Nombre y campos de la plantilla son requeridos"}),
                400,
            )

        templates_collection = current_app.mongo.db.templates

        new_template = {"name": name, "fields": fields}

        inserted_template = templates_collection.insert_one(new_template)
        logging.info(
            f"Template created successfully with ID: {inserted_template.inserted_id}"
        )

        response_data = {
            "_id": str(inserted_template.inserted_id),
            "name": name,
            "fields": fields,
        }
        return jsonify(response_data), 201

    except Exception as e:
        logging.error(f"Error during template creation: {e}")
        return jsonify({"message": "Error interno del servidor"}), 500


def get_templates():
    """
    Endpoint to retrieve all templates.

    Fetches all documents from the 'templates' collection in MongoDB.

    Returns:
        jsonify: A JSON response containing a list of all templates. Each template
        includes its '_id', 'name', and 'fields'.
    """

    templates_collection = current_app.mongo.db.templates
    
    templates = list(templates_collection.find())

    template_list = []
    for template in templates:
        template_list.append(
            {
                "_id": str(template["_id"]),
                "name": template.get("name"),
                "fields": template.get("fields"),
            }
        )

    return jsonify(template_list)
