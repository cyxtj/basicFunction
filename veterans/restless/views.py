#coding=utf8

from veterans.main import veteransApp
from models import *
from flask.ext.restless import APIManager

# using restless
# init the manager
manager = APIManager(veteransApp, flask_sqlalchemy_db=db)

# api for drug
manager.create_api(drug, methods=['GET','POST', 'DELETE', 'PUT'], postprocessors=dict(GET_MANY= [drug.get_all]))

# api for fixedrecipe
manager.create_api(fixedrecipe, methods=['GET','POST','DELETE', 'PUT'], postprocessors=dict(GET_MANY= [fixedrecipe.get_all]))

# api for fixedrecipeItem
manager.create_api(fixedrecipeItem, methods=['GET','POST','DELETE', 'PUT'], postprocessors=dict(GET_MANY= [fixedrecipeItem.get_all]))


# api for western_disease
manager.create_api(western_disease, methods=['GET','POST', 'DELETE', 'PUT'], postprocessors=dict(GET_MANY= [western_disease.get_all]))
