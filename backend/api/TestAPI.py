from flask_restful import Resource, reqparse

class TestAPI(Resource):
    def get(self):
        # parse query string
        print('getting test')
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, location='args')
        parser.add_argument('age', type=int, location='args')
        args = parser.parse_args()
        print(args)
        return args, 200
    
    def post(self):
        pass

        

    