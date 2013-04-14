#coding=utf-8

from flask.ext.testing import TestCase
from veterans.main import veteransApp
from veterans.simple.models import *
import json

class TestAPI(TestCase):
    def create_app(self):
        veteransApp.config['TESTING'] = True
        return veteransApp

    def setUp(self): 
        self.client = veteransApp.test_client()
        db.create_all()

    def init_data(self):
        self.p1 = Page(name='p1')
        self.p2 = Page(name='p2')
        self.p3 = Page(name='p3')
        self.t1 = Tag(name='t1')
        self.t2 = Tag(name='t2')
        self.p1t1 = PageTags(page=self.p1, tag=self.t1, info='p1t1')
        self.p1t2 = PageTags(page=self.p1, tag=self.t2, info='p1t2')
        self.p2t1 = PageTags(page=self.p2, tag=self.t1, info='p2t1')
        self.p3t2 = PageTags(page=self.p3, tag=self.t2, info='p3t2')
        db.session.add(self.p1t1)
        db.session.add(self.p1t2)
        db.session.add(self.p2t1)
        db.session.add(self.p3t2)
        db.session.commit()

    def tearDown(self): 
        db.session.remove()
        db.drop_all()

    def test_api_page_list_empty(self):
        res = self.client.get('/api/page')
        self.assertEqual(res.json["num_results"], 0)

    def test_api_page_list_two(self):
        res = self.client.post('/api/page', data='{"name":"first"}')
        res = self.client.post('/api/page', data='{"name":"second"}')
        res = self.client.get('/api/page')
        self.assertEqual(res.json["num_results"], 2)
    
    def test_api_page_post(self):
        res = self.client.post('/api/page', data='{"name":"first"}')
        pageList = Page.query.all()
        self.assertEqual(pageList[0].name, 'first')
        res = self.client.post('/api/page', data='{"name":"second"}')
        pageList = Page.query.all()
        self.assertEqual(len(pageList), 2)

    def test_api_page_get(self):
        res = self.client.post('/api/page', data='{"name":"first"}')
        res = self.client.post('/api/page', data='{"name":"second"}')
        res = self.client.get('/api/page/1')
        self.assertEqual(res.json['name'], 'first')
        res = self.client.get('/api/page/2')
        self.assertEqual(res.json['name'], 'second')
        self.init_data()
        res = self.client.get('/api/page/4')
        print res.json

    def test_api_page_delete(self):
        res = self.client.post('/api/page', data='{"name":"first"}')
        res = self.client.post('/api/page', data='{"name":"second"}')
        pageList = Page.query.all()
        self.assertEqual(len(pageList), 2)
        res = self.client.delete('/api/page/2')
        pageList = Page.query.all()
        self.assertEqual(len(pageList), 1)
        self.assertEqual(pageList[0].name, 'first')
        res = self.client.delete('/api/page/8')
        self.assertEqual(res.status_code, 204)

    def test_api_pagetags_add(self):
        res = self.client.post('/api/tag', data='{"name":"1"}')
        #res = self.client.post('/api/page', data='{"name":"first", "pagetags":{"tag_id":1}}')
        #pagetagsList = PageTags.query.all()
        #self.assertEqual(pagetagsList[0].page.name, 'first')
    
    def test_add_pagetags(self):
        self.init_data()
        pageList = Page.query.all()
        tagList = Tag.query.all()
        pagetagsList = PageTags.query.all()
        self.assertEqual(len(pageList), 3)
        self.assertEqual(len(tagList), 2)
        self.assertEqual(len(pagetagsList), 4)
    
    def test_delete_pagetags(self):
        self.init_data()
        db.session.delete(self.p1t1)
        db.session.commit()
        pagetagsList = PageTags.query.all()
        self.assertEqual(len(pagetagsList), 3)
        db.session.delete(self.p2t1)
        db.session.commit()
        pagetagsList = PageTags.query.all()
        self.assertEqual(len(pagetagsList), 2) 
    

if __name__ == '__main__':
    unittest.main()
