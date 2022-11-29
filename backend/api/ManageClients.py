from flask_restful import Resource, reqparse
import sqlite3
import json
from datetime import datetime


class ManageClients(Resource):
    def get(self):
        conn = sqlite3.connect('timeit.db')
        cur = conn.cursor()
        res = cur.execute("SELECT * FROM clients WHERE user_id = 0")
        clients = {
            'cl': []
        }
        for row in res:
            tmp = {}
            tmp['id'] = row[0]
            tmp['name'] = row[1]
            tmp['address'] = row[2]
            tmp['city'] = row[3]
            tmp['state'] = row[4]
            tmp['zip'] = row[5]
            tmp['ABN'] = row[6]
            tmp['OfficialName'] = row[7]
            tmp['invoiced_entity'] = row[11]
            clients['cl'].append(tmp)

        clientdata = json.dumps(clients)

        return clientdata, 200

    def post(self):
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
