from flask import Flask
import os


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'amorfati'

    from Website.index import views

    app.register_blueprint(views, url_prefix='/')

    app.template_folder = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'templates')
    app.static_folder = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static')

    return app