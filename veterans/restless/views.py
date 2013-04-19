#coding=utf8

from veterans.main import veteransApp
from models import *
from flask.ext.restless import APIManager

# using restless
# init the manager
manager = APIManager(veteransApp, flask_sqlalchemy_db=db)

# api for drug
manager.create_api(Drug, methods=['GET','POST', 'DELETE', 'PUT'], preprocessors=dict(POST=[Drug.post_preprocessor]), postprocessors=dict(GET_MANY= [Drug.get_all]))

# api for fixedrecipe
manager.create_api(Fixedrecipe, methods=['GET','POST','DELETE', 'PUT'], preprocessors=dict(POST=[Fixedrecipe.post_preprocessor], PUT=[Fixedrecipe.put_preprocessor]), postprocessors=dict(GET_MANY= [Fixedrecipe.get_all]))

# api for fixedrecipe_item
manager.create_api(FixedrecipeItem, methods=['GET','POST','DELETE', 'PUT'], preprocessors=dict(POST=[FixedrecipeItem.post_preprocessor]))

# api for chinese_disease
manager.create_api(ChineseDisease, methods=['GET','POST', 'DELETE', 'PUT'], preprocessors=dict(POST=[ChineseDisease.post_preprocessor]), postprocessors=dict(GET_MANY= [ChineseDisease.get_all]))
# api for western_disease
manager.create_api(WesternDisease, methods=['GET','POST', 'DELETE', 'PUT'], postprocessors=dict(GET_MANY= [WesternDisease.get_all]))
