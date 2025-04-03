import os
import logging
from core import create_app
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

load_dotenv()
logging.info("Environment variables loaded.")

"""
    Entry point to the application.

    Initializes and runs the Flask application based on the 'FLASK_ENV'
    environment variable (defaults to 'default').
"""

env = os.environ.get("FLASK_ENV", "default")

app = create_app(env)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logging.info(f"Attempting to run the application on port: {port}")

    app.run(host="0.0.0.0", port=port, debug=(env == "development"))
