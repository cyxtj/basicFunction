#coding=utf8

import syspath_config

#from app folder import app defined in __init__.py
from veterans.main import veteransApp
#from veterans.restless.data_drug import *
#from veterans.restless.data_chinese_disease import *
#from veterans.restless.data_fixedrecipe import *
#from veterans.restless.data_fixedrecipeItem import *
#from veterans.restless.data_western_disease import *
from cherrypy import wsgiserver
d = wsgiserver.WSGIPathInfoDispatcher({'/': veteransApp})
server = wsgiserver.CherryPyWSGIServer(('0.0.0.0', 8008), d)

if __name__ == '__main__':
    try:
        print "start server ....."
        server.start()
    except KeyboardInterrupt:
        print "stop server ....."
        server.stop()
