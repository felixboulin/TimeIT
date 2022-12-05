from flask_restful import Resource, reqparse
import sqlite3
import json
from datetime import datetime


class ManageEntries(Resource):
    def get(self):
        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()
        res = cur.execute("""
            SELECT e.id, e.entry_date, e.hours, e.task, e.invoice_reference, e.comments, p.name, c.name, e.invoiced 
            FROM entries as e
            JOIN projects as p ON e.project_id = p.id
            JOIN clients as c ON p.client_id = c.id
            WHERE e.user_id = 0
        """)
        entries = {
            'en': []
        }
        for row in res:
            tmp = {}
            tmp['id'] = row[0]
            tmp['entry_date'] = row[1]
            tmp['hours'] = row[2]
            tmp['task'] = row[3]
            tmp['invoice_reference'] = row[4]
            tmp['comments'] = row[5]
            tmp['project'] = row[6]
            tmp['client'] = row[7]
            tmp['invoiced'] = 'N' if row[8] == 0 else 'Y'
            entries['en'].append(tmp)

        entriesData = json.dumps(entries)

        return entriesData, 200

    def post(self):
        # edit entry
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int)
        parser.add_argument('entry_date', type=str)
        parser.add_argument('hours', type=float)
        parser.add_argument('task', type=str)
        parser.add_argument('invoice_reference', type=str)
        parser.add_argument('comments', type=str)
        parser.add_argument('invoiced', type=int)
        parser.add_argument('project_id', type=int)

        args = parser.parse_args()

        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()

        if args['id'] < 0:
            # add new client
            print('new')
            print(args['project_id'])
            try:
                cur.execute("""INSERT INTO entries (user_id, entry_date, hours, task, invoice_reference, comments, invoiced, project_id) 
                            VALUES (0, ?, ?, ?, ?, ?, ?, ?)""",
                            (args['entry_date'], args['hours'], args['task'], args['invoice_reference'], args['comments'], args['invoiced'], args['project_id']))
                conn.commit()
                return {'message': 'Entry added'}, 200
            except Exception as e:
                print(e)
                return {
                    'message': 'Entry not added'
                }, 204

        else:
            # edit existing client
            try:
                cur.execute("UPDATE entries SET entry_date = ?, hours = ?, task = ?, invoice_reference = ?, comments = ?, invoiced = ?, updated_at = ? WHERE id = ?",
                            (args['entry_date'], args['hours'], args['task'], args['invoice_reference'], args['comments'], args['invoiced'], timestamp, args['id']))
                conn.commit()
                return {'message': 'Entry updated'}, 200
            except:
                return {
                    'message': 'Error, entry not updated'
                }, 204
