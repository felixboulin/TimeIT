from flask_restful import Resource, reqparse


class AddClient(Resource):
    def get(self):
        return {
            'message': 'This url is designed to respond to POST requests'
        }

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        args = parser.parse_args()
        print(args)
        pass
        return args
