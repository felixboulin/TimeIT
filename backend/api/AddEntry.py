from flask_restful import Resource, reqparse
import sqlite3
import datetime


class AddEntry(Resource):
    def get(self):
        pass

    def post(self):
        def convertTime(x): return round(float(x / 3600), 2)
        date = datetime.datetime.now().strftime("%Y-%m-%d")

        parser = reqparse.RequestParser()
        parser.add_argument('task', type=str)
        parser.add_argument('project', type=str)
        parser.add_argument('client', type=str)
        parser.add_argument('time', type=int)
        parser.add_argument('comment', type=str)
        parser.add_argument('invoiceRef', type=str)
        args = parser.parse_args()
        print(args)
        print(date)
        print(convertTime(args['time']))

        time = convertTime(args['time'])

        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()

        try:
            client_id = cur.execute(
                "SELECT id FROM clients WHERE name = ?", (args['client'],)).fetchone()[0]
            print(client_id)
            project_id = cur.execute(
                "SELECT id FROM projects WHERE name = ? AND client_id = ?", (args['project'], client_id,)).fetchone()[0]
            print(project_id)
            cur.execute("INSERT INTO entries (task, project_id, hours, comments, invoice_reference, entry_date) VALUES (?, ?, ?, ?, ?, ?)",
                        (args['task'], project_id, time, args['comment'], args['invoiceRef'], date,))
            conn.commit()
            return 'Entry added successfully', 200
        except:
            return 'Could not add entry to database', 204
