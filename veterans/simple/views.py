#coding=utf8

from app.main import veteransApp
from app.simple.models import *
from flask.ext.restless import APIManager

# init the manager
manager = APIManager(veteransApp, flask_sqlalchemy_db=db)

manager.create_api(Page, methods=['GET', 'POST', 'DELETE', 'PATCH', 'PUT'])
manager.create_api(Tag, methods=['GET', 'POST', 'DELETE', 'PATCH', 'PUT'])
manager.create_api(PageTags, methods=['GET', 'POST', 'DELETE', 'PATCH', 'PUT'])
