from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from api.AddClient import AddClient
from api.AddEntry import AddEntry
from api.AddProject import AddProject
from api.TestAPI import TestAPI
from api.ManageClients import ManageClients
from api.ManageEntries import ManageEntries

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory('./', 'index.html')


api.add_resource(AddEntry, '/add-entry')
api.add_resource(AddClient, '/add-client')
api.add_resource(AddProject, '/add-project')
api.add_resource(TestAPI, '/test', endpoint='test')
api.add_resource(ManageClients, '/manage-clients')
api.add_resource(ManageEntries, '/manage-entries')
