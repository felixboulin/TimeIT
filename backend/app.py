from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from api.AddClient import AddClient
from api.SubmitTime import SubmitTime

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory('./', 'index.html')


api.add_resource(SubmitTime, '/submitTime')
api.add_resource(AddClient, '/add-client')
