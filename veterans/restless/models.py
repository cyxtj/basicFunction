#coding=utf-8

import uuid
import datetime
from veterans.main import veteransApp
from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy(veteransApp)

class drug(db.Model):
    DRUGid = db.Column(db.String(36), nullable=False, primary_key=True)
    code = db.Column(db.String(20), nullable=True)
    name = db.Column(db.String(50), nullable=True)
    unit = db.Column(db.String(10), nullable=True)
    alias = db.Column(db.String(100), nullable=True, default=' ')
    py = db.Column(db.String(20), nullable=True, default=' ')
    wb = db.Column(db.String(20), nullable=True, default=' ')
    isClassical = db.Column(db.Boolean, nullable=True, default=1) #comment '1:是标准的;0:非标准的'
    SPETid = db.Column(db.String(36), nullable=True, default=' ')
    illustration = db.Column(db.Text, nullable=True, default=' ')
    createDay = db.Column(db.DateTime, nullable=True, default='1900-1-1')
    optrid = db.Column(db.String(36), nullable=True, default=' ')
    state = db.Column(db.Boolean, nullable=True, default=0) #comment '0:正常;1:锁定'

    @classmethod
    def get_all(self, data):
        tempList = []
        for (i, temp) in enumerate(data['objects']):
            tempList.append({})
            tempList[i]['DRUGid'] = temp['DRUGid']
            tempList[i]['code'] = temp['code']
            tempList[i]['name'] = temp['name']
            tempList[i]['isClassical'] = temp['isClassical']
            tempList[i]['SPETid'] = temp['SPETid']
            tempList[i]['state'] = temp['state']
        data['objects'] = tempList
        return data

    @classmethod
    def post_preprocessor(self, data):
        data['DRUGid'] = str(uuid.uuid4())
        data['createDay'] = str(datetime.datetime.now())
        return data

class fixedrecipe(db.Model):
    FREPid = db.Column(db.String(36), nullable=False, primary_key=True)
    code = db.Column(db.String(20), nullable=True)
    name = db.Column(db.String(50), nullable=True)
    effect = db.Column(db.String(200), nullable=True, default=' ')
    py = db.Column(db.String(20), nullable=True, default=' ')
    wb = db.Column(db.String(20), nullable=True, default=' ')
    isClassical = db.Column(db.Boolean, nullable=True, default=1) #comment '1:是标准的;0:非标准的'
    SPETid = db.Column(db.String(36), nullable=True, default=' ')
    illustration = db.Column(db.Text, nullable=True, default=' ')
    createDay = db.Column(db.DateTime, nullable=True, default='1900-1-1')
    optrid = db.Column(db.String(36), nullable=True, default=' ')
    state = db.Column(db.Boolean, nullable=True, default=0) #comment '0:正常;1:锁定'

    @classmethod
    def get_all(self, data):
        tempList = []
        for (i, temp) in enumerate(data['objects']):
            tempList.append({})
            tempList[i]["FREPid"] = temp['FREPid']
            tempList[i]["name"] = temp['name']
            tempList[i]["code"] = temp['code']
            tempList[i]["effect"] = temp['effect']
            tempList[i]["isClassical"] = temp['isClassical']
            tempList[i]["SPETid"] = temp['SPETid']
            tempList[i]["py"] = temp['py']
            tempList[i]["wb"] = temp['wb']
            tempList[i]["state"] = temp['state']
        data['object'] = tempList
        return data

    @classmethod
    def post_preprocessor(self, data):
        data['FREPid'] = str(uuid.uuid4())
        data['createDay'] = str(datetime.datetime.now())
        for (i, temp) in enumerate(data['fixedrecipeItems']):
            del data['fixedrecipeItems'][i]['drug_name']
        return data

    @classmethod
    def put_preprocessor(self, data):
        print data
        return data

    @classmethod
    def get_by_id(self, data):
        tempList = []
        for (i, temp) in enumerate(data['fixedrecipeItems']):
            id = (str(data['fixedrecipeItems'][i]['DRUGid']))
            data['fixedrecipeItems'][i]['drug_name'] = drug.query.filter_by(DRUGid=id).first().name
            
        return data


class fixedrecipeItem(db.Model):
    FRITid = db.Column(db.String(36), nullable=False, primary_key=True)
    DRUGid = db.Column(db.String(36),db.ForeignKey('drug.DRUGid'))
    FREPid = db.Column(db.String(36),db.ForeignKey('fixedrecipe.FREPid'))
    quality = db.Column(db.Float, nullable=True, default=0)
    sequence = db.Column(db.Integer, nullable=True, default=0)
    illustration = db.Column(db.Text, nullable=True, default=' ')
    
    drug = db.relationship('drug', backref=db.backref('fixedrecipeItems', cascade='all, delete-orphan'))
    fixedrecipe = db.relationship('fixedrecipe', backref=db.backref('fixedrecipeItems', cascade='all, delete-orphan'))
    #primary key (FRITid)

    @classmethod
    def post_preprocessor(self, data):
        data['FRITid'] = str(uuid.uuid4())
        data['createDay'] = str(datetime.datetime.now())
        return data


class ChineseDisease(db.Model):
    CDISid = db.Column(db.String(36), nullable=False, primary_key=True)
    code = db.Column(db.String(20), nullable=True)
    name = db.Column(db.String(100), nullable=True)
    parentcode = db.Column(db.String(20), nullable=True) #comment '无父节点,用-1代表'
    level = db.Column(db.SMALLINT, nullable=True) #comment '从1开始'
    isClassical = db.Column(db.Boolean, nullable=True, default=1) #comment '1:是标准的;0:非标准的'
    SPETid = db.Column(db.String(36), nullable=True, default=' ')
    illustration = db.Column(db.Text, nullable=True, default=' ')
    createDay = db.Column(db.DateTime, nullable=True, default='1900-1-1')
    optrid = db.Column(db.String(36), nullable=True, default=' ')
    state = db.Column(db.SMALLINT, nullable=True, default=0) #comment '0:正常;1:锁定'

    @classmethod
    def get_all(self, data):
        tempList = []
        for (i, temp) in enumerate(data['objects']):
            tempList.append({})
            tempList[i]["CDISid"]=temp['CDISid']
            tempList[i]["code"]=temp['code']
            tempList[i]["name"]=temp['name']
            tempList[i]["level"]=temp['level']
            tempList[i]["isClassical"]=temp['isClassical']
            tempList[i]["SPETid"]=temp['SPETid']
            tempList[i]["state"]=temp['state']
        data['objects'] = tempList
        return data

    @classmethod
    def post_preprocessor(self, data):
        data['CDISid'] = str(uuid.uuid4())
        data['createDay'] = str(datetime.datetime.now())

class western_disease(db.Model):
    WDISid = db.Column(db.String(36), nullable=False, primary_key=True)
    code = db.Column(db.String(20), nullable=True)
    name = db.Column(db.String(50), nullable=True)
    parentcode = db.Column(db.String(20), nullable=True)
    level = db.Column(db.String(10), nullable=True, default=' ')
    isClassical = db.Column(db.Boolean, nullable=True, default=1) #comment '1:是标准的;0:非标准的'
    SPETid = db.Column(db.String(36), nullable=True, default=' ')
    illustration = db.Column(db.Text, nullable=True, default=' ')
    createDay = db.Column(db.DateTime, nullable=True, default='1900-1-1')
    optrid = db.Column(db.String(36), nullable=True, default=' ')
    state = db.Column(db.Boolean, nullable=True, default=0) #comment '0:正常;1:锁定'

    @classmethod
    def get_all(self, data):
        tempList = []
        for (i, temp) in enumerate(data['objects']):
            tempList.append({})
            tempList[i]['WDISid'] = temp['WDISid']
            tempList[i]['code'] = temp['code']
            tempList[i]['name'] = temp['name']
            tempList[i]['isClassical'] = temp['isClassical']
            tempList[i]['SPETid'] = temp['SPETid']
            tempList[i]['state'] = temp['state']
        data['objects'] = tempList
        return data