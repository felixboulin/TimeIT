from flask_restful import Resource, Api, reqparse
import sqlite3


class AddProject(Resource):

    def get(self):
        pass

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('client', type=str)
        parser.add_argument('type', type=str)
        args = parser.parse_args()
        print(args)

        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()

        if args['type'] == 'display':
            projects = []
            try:
                id = cur.execute("SELECT id FROM clients WHERE name = ?",
                                 (args['client'],)).fetchone()[0]
                res = cur.execute(
                    "SELECT name FROM projects WHERE client_id = ?", str(id))
                for row in res:
                    projects.append(row[0])
                return projects, 200
            except:
                return {
                    'message': 'No Client found'
                }, 204

        else:
            res = cur.execute(
                "SELECT id FROM clients WHERE name = ?", (args['client'],)).fetchone()[0]
            print(res)
            if not res:
                print("Client does not exist")
                return {
                    'message': 'Client does not exist'
                }, 204

            else:
                try:
                    cur.execute("INSERT INTO projects (name, client_id) VALUES (?, ?)",
                                (args['name'], res,))
                    conn.commit()
                except sqlite3.IntegrityError:
                    return {
                        'message': 'Project already exists'
                    }, 204

                return 'Client added successfully', 200
