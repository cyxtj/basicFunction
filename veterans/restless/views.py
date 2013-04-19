#coding=utf8

from veterans.main import veteransApp
from models import *
from flask.ext.restless import APIManager

# using restless
# init the manager
manager = APIManager(veteransApp, flask_sqlalchemy_db=db)

# api for drug
manager.create_api(drug, methods=['GET','POST', 'DELETE', 'PUT'], preprocessors=dict(POST=[drug.post_preprocessor]), postprocessors=dict(GET_MANY= [drug.get_all]))

# api for fixedrecipe
manager.create_api(fixedrecipe, methods=['GET','POST','DELETE', 'PUT'], preprocessors=dict(POST=[fixedrecipe.post_preprocessor], PUT=[fixedrecipe.put_preprocessor]), postprocessors=dict(GET_MANY= [fixedrecipe.get_all]))

# api for fixedrecipe_item
manager.create_api(fixedrecipeItem, methods=['GET','POST','DELETE', 'PUT'], preprocessors=dict(POST=[fixedrecipeItem.post_preprocessor]))

# api for chinese_disease
manager.create_api(ChineseDisease, methods=['GET','POST', 'DELETE', 'PUT'], preprocessors=dict(POST=[ChineseDisease.post_preprocessor]), postprocessors=dict(GET_MANY= [ChineseDisease.get_all]))
