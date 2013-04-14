#coding=utf-8

from app.main import veteransApp
from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy(veteransApp)

class PageTags(db.Model):
    page_id = db.Column(db.Integer, db.ForeignKey('page.id'),  primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'),  primary_key=True)
    info = db.Column(db.Text)

    tag = db.relationship('Tag', backref='tagpages')
    page = db.relationship('Page', backref='pagetags')


class Page(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10)) 

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10))



