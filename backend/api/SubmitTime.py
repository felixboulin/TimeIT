from flask_restful import Resource, reqparse


class SubmitTime(Resource):
    def get(self):
        return {
            'message': 'This url is designed to respond to POST requests'
        }

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('url', type=str)
        args = parser.parse_args()

        pass
        return
