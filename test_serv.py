# -*- coding: utf-8 -*-

from threading import Thread
import sys
import json
import MainJSON
import psycopg2
import psycopg2.extras
from http.server import HTTPServer, BaseHTTPRequestHandler, urllib

class DataBase():
    def __init__(self, _host, _dbname, _user, _pswd):
        self.host = _host
        self.dbname = _dbname
        self.user = _user
        self.pswd = _pswd

    def connect (dbObj):
        conn_string = "host=%s dbname=%s user=%s password=%s" % (dbObj.host, dbObj.dbname, dbObj.user, dbObj.pswd,)
        print ("Connecting to database\n ->%s" % (conn_string))
        try:
            db = psycopg2.connect(conn_string)

        except psycopg2.Error as e:
            print ("I am unable to connect to the database")
            print ("-------",e.pgerror)
            return 101
            #sys.exit(101)

        cursor = db.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        return cursor

dbObj = DataBase('localhost', 'gis_perm', 'gis_user', '123')
cursor = DataBase.connect(dbObj)

class GISRequestHandler(BaseHTTPRequestHandler):

    def load_file(self, name, content_type='text/html'):
           self.send_response(200)
           self.send_header('Content-type', content_type)
           self.end_headers()
           with open(name, 'rb') as _file:
               self.wfile.write(_file.read())

    def load_str(self, data):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(bytes(data, 'utf-8'))


    #

    def to_json(self, data):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(str.encode(json.dumps(data)))

    def do_GET(self):
        print(self.path)
        if self.path.endswith('png'):
            self.load_file(self.path.lstrip('/'),'image/png')
        elif self.path.endswith('jpg'):
            self.load_file(self.path.lstrip('/'),'image/jpeg')
        elif self.path.endswith('gif'):
            self.load_file(self.path.lstrip('/'),'image/gif')
        elif self.path.startswith('/static'):
            content_type = 'text/html'
            if self.path.endswith('jpg'):
                content_type = 'image/jpeg'
            elif self.path.endswith('css'):
                content_type = 'text/css'
            elif self.path.endswith('js'):
                content_type = 'text/plain'
            self.load_file(self.path.lstrip('/'), content_type)

        elif self.path.startswith('/GIS'):
            self.process_gis_URLs(self.path)
        elif self.path.startswith('/GIS2'):
            self.process_gis_URLs(self.path)


        elif self.path == "/exit":
            self.load_str('')
            global need_to_exit
            need_to_exit = True
            self.server.server_close()
            exit(0)
        else:
            self.load_file('index.html')

    def do_POST(self):
        print(self.path)
        _ = self.rfile.read(
               int(self.headers.get('content-length'))
           ).decode('utf-8')
        print(_)
        data = _ #urllib.parse.parse_qs(_)

        if self.path.startswith('/GIS'):
            self.process_gis_URLs(self.path, json.dumps(data))
        elif self.path.startswith('/GIS2'):
            self.process_gis_URLs(self.path, json.dumps(data))
        elif self.startswith('/GIS/get_state'):
            self.process_gis_URLs(self.path, json.dumps(data))
        else:
            result = 'ok'
            self.load_str(result)

    def log_message(self, format, *args):
        return

    def process_gis_URLs(self, path, data = None):
        global cursor, dbObj
        if path == "/GIS":
            self.load_file('gis.html')
        elif path == "/GIS2":
            self.load_file('gis2.html')
        elif path == "/GIS/get/current_loc":
            self.load_str(MainJSON.GetCurentLoc1(cursor))
        elif path == "/GIS2/get/current_loc":
            self.load_str(MainJSON.GetCurentLoc1(cursor))

        elif path == "/GIS/get/way":
            self.load_str(MainJSON.GetWay1(cursor))
        elif path == "/GIS2/get/way":
            self.load_str(MainJSON.GetWay1(cursor))
        elif path == "/GIS/get_state":#System state
            if (DataBase.connect(dbObj) == 101):
                data = {'error':'GIS101', 'text': 'Database connect error'}
                #self.load_str(data)
                self.to_json(data)
            else:
                self.load_str('ok')

        elif path == "/GIS/send/way":
            self.load_str(MainJSON.MrkWayUpdateJSON(data, 1))

        elif path == "/GIS2/send/way":
            print(">>>>>>>>", data, file=sys.stderr)##!!!!!!

            self.load_str(MainJSON.MrkWayUpdateJSON(data, 2))

           # self.load_str('ok')
        elif path == "/GIS/TEMP.html":
            self.load_file('TEMP.html')
           # self.load_str('ok')

        else:
            self.to_json({'error':'GIS404', 'path': path})



if __name__ == "__main__":
#    open_bins_port()
#    reader = Thread(target=read_packet)
#    reader.start()
    server = HTTPServer(('0.0.0.0', 8001), GISRequestHandler)
    try:
        server.serve_forever()
    except:
        need_to_exit = True
