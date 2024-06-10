from flask import Flask
from datetime import timedelta


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'amorfati'

    from .index import views

    app.register_blueprint(views, url_prefix='/')

    return app