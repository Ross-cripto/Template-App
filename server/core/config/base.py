import os
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

"""
    Configuration settings for the Flask application in different environments
    (Development, Testing, Production).
"""

class Config:
    """Base configuration class. Contains settings common to all environments."""
    SECRET_KEY = '89bc0238bb30da6e4f9c2dc71c220284f4b5675c1c909a8fdde0135982b1d35f' # I dont like to use this, but itn's required.
    logging.info("Base configuration loaded.")

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/test')
    logging.info(f"Development configuration loaded.")

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/test')
    logging.info(f"Testing configuration loaded.")

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/test')
    logging.info(f"Production configuration loaded.")


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig  
}