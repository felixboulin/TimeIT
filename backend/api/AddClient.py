from flask_restful import Resource, reqparse
import sqlite3


class AddClient(Resource):
    def get(self):
        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()
        res = cur.execute("SELECT name FROM clients")
        clients = []
        for row in res:
            clients.append(row[0])
        return clients, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        args = parser.parse_args()

        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()

        try:
            cur.execute("INSERT INTO clients (name) VALUES (?)",
                        (args['name'],))
            conn.commit()
        except sqlite3.IntegrityError:
            return {
                'message': 'Client name already exists'
            }, 200

        return 'Client added successfully', 200
