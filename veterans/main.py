#coding=utf8
import flask
#from flask import render_template

veteransApp = flask.Flask(__name__)
veteransApp.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:levis822@localhost:3306/veterans'

@veteransApp.route('/')
def index():
    #return veteransApp.send_static_file('index.html')
    #return flask.send_file('index.html')
    return flask.make_response(open('veterans/static/index.html').read())
    #return flask.render_template("index.html")

#from simple.views import *
from restless.views import *
