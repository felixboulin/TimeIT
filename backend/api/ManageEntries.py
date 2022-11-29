from flask_restful import Resource, reqparse
import sqlite3
import json
from datetime import datetime


class ManageEntries(Resource):
    def get(self):
        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()
        res = cur.execute("""
            SELECT e.id, e.entry_date, e.hours, e.task, e.invoice_reference, e.comments, p.name, c.name 
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
            entries['en'].append(tmp)

        entriesData = json.dumps(entries)

        return entriesData, 200

    def post(self):
        return
        # edit client
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int)
        parser.add_argument('name', type=str)
        parser.add_argument('address', type=str)
        parser.add_argument('city', type=str)
        parser.add_argument('state', type=str)
        parser.add_argument('zip', type=str)
        parser.add_argument('ABN', type=str)
        parser.add_argument('OfficialName', type=str)
        parser.add_argument('invoiced_entity', type=str)

        args = parser.parse_args()
        print(args)

        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()

        if args['id'] < 0:
            # add new client
            try:
                cur.execute("INSERT INTO clients (name, address, city, state, zip, ABN, OfficialName, invoiced_entity, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)",
                            (args['name'], args['address'], args['city'], args['state'], args['zip'], args['ABN'], args['OfficialName'], args['invoiced_entity']))
                conn.commit()
            except sqlite3.IntegrityError:
                return {
                    'message': 'Client name already exists'
                }, 200

        else:
            # edit existing client
            try:
                cur.execute("UPDATE clients SET name = ?, address = ?, city = ?, state = ?, zip = ?, ABN = ?, OfficialName = ?, invoiced_entity = ?, updated_at = ? WHERE id = ?",
                            (args['name'], args['address'], args['city'], args['state'], args['zip'], args['ABN'], args['OfficialName'], args['invoiced_entity'], timestamp, args['id']))
                conn.commit()
            except:
                return {
                    'message': 'Error, client not updated'
                }, 204
