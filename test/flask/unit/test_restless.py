#coding=utf-8

from flask.ext.testing import TestCase
from veterans.main import veteransApp
from veterans.restless.models import *
import json

class TestFixedrecipeItem(TestCase):

    def create_app(self):
        veteransApp.config['TESTING'] = True
        return veteransApp

    def setUp(self):
        db.session.remove()
        db.drop_all()
        db.create_all()
        self.client = veteransApp.test_client()

        #add basic data to database
        new_drug = drug(DRUGid='e28b7d9c-e817-47c1-b227-97d8eca021a7',\
                        code='2062', name='杏仁', unit='克', alias=' ',\
                        py='xr', wb='sw', isClassical='1', SPETid=' ',\
                        illustration='', createDay='2008-03-25 01:42:59.000',\
                        optrid='c6543358-354b-4986-a06f-bd61b0cde15d', state='3')
        db.session.add(new_drug)

        new_fixedrecipe = fixedrecipe(FREPid='65dd5753-aad0-4261-94d3-09a67bd4f9a1',\
                        code='378', name='华盖散', effect='', py='HGS', wb='WUA', isClassical='1',\
                        SPETid=' ', illustration='', createDay='2008-03-25 02:05:10.000',\
                        optrid='c6543358-354b-4986-a06f-bd61b0cde15d', state='3')
        db.session.add(new_fixedrecipe)

        new_fixedrecipeItem = fixedrecipeItem(FRITid='9c18a29f-faa1-494d-839c-7a89cba439e8',\
                            DRUGid='e28b7d9c-e817-47c1-b227-97d8eca021a7',\
                            FREPid='65dd5753-aad0-4261-94d3-09a67bd4f9a1',\
                            quality='9.0001', sequence='0', illustration='')
        db.session.add(new_fixedrecipeItem)

        db.session.commit()

    def tearDown(self):
        pass
        #db.session.remove()
        #db.drop_all()

    def test_drug_get_all(self):
        r = self.client.get('/api/drug')
        self.assertEqual(json.loads(r.data)['num_results'], 1)

    def test_drug_get_by_id(self):
        r = self.client.get('/api/drug/e28b7d9c-e817-47c1-b227-97d8eca021a7')
        self.assertEqual(json.loads(r.data)['DRUGid'], 'e28b7d9c-e817-47c1-b227-97d8eca021a7')
        print r.__dict__

    def test_drug_add(self):
        r = self.client.post('/api/drug', data='{"DRUGid":"e28b7d9c-e817-47c1-b227-97d8eca021a7","code":"2062","name":"test杏仁","unit":"g"}')

    def test_drug_delete(self):
        r  = self.client.delete('/api/drug/e28b7d9c-e817-47c1-b227-97d8eca021a7')
        r = self.client.get('/api/drug')
        self.assertEqual(json.loads(r.data)['num_results'], 0)
        #the fixedrecipeItem shoule be deleted too
        r = self.client.get('/api/fixedrecipe_item')
        self.assertEqual(json.loads(r.data)['num_results'], 0)
        

    def test_fixedrecipe_get_all(self):
        r = self.client.get('/api/fixedrecipe')
        self.assertEqual(json.loads(r.data)['num_results'], 1)

    def test_fixedrecipe_get_by_id(self):
        r = self.client.get('/api/fixedrecipe/65dd5753-aad0-4261-94d3-09a67bd4f9a1')
        self.assertEqual(json.loads(r.data)['FREPid'], '65dd5753-aad0-4261-94d3-09a67bd4f9a1')

    def test_fixedrecipe_add(self):
        r = self.client.post('/api/fixedrecipe',\
                    data='{"FREPid":"test-e28b7d9c-e817-47c1-b227-97d8eca",\
                        "code":"386","name":"test-abcfiexedrecipe","effect":"",\
                        "py":"JWQHT","wb":"VKUII","isClassical":"1","SPETid":"",\
                        "illustration":"","createDay":"1990-1-1 00:00:00",\
                        "optrid":"c6543358-354b-4986-a06f-bd61b0cde15d","state":"3"}')
        r = self.client.get('/api/fixedrecipe')
        self.assertEqual(json.loads(r.data)['num_results'], 2)

    def test_fixedrecipe_delete(self):
        r = self.client.delete('/api/fixedrecipe/65dd5753-aad0-4261-94d3-09a67bd4f9a1')
        r = self.client.get('/api/fixedrecipe')
        self.assertEqual(json.loads(r.data)['num_results'], 0)
        #the fixedrecipeItem shoule be deleted too
        r = self.client.get('/api/fixedrecipe_item')
        self.assertEqual(json.loads(r.data)['num_results'], 0)
       

    def test_fixedrecipeItem_get_all(self):
        r = self.client.get('/api/fixedrecipe_item')
        self.assertEqual(json.loads(r.data)['num_results'], 1)

    def test_fixedrecipeItem_get_by_id(self):
        r = self.client.get('/api/fixedrecipe_item/9c18a29f-faa1-494d-839c-7a89cba439e8')
        #print r.data
        self.assertEqual(json.loads(r.data)['FRITid'], '9c18a29f-faa1-494d-839c-7a89cba439e8')

    def test_fixedrecipeItem_add(self):
        r = self.client.post('/api/fixedrecipe_item',\
                            data='{"FRITid":"test-9c18a29f-faa1-494d-839c-7a89cba",\
                            "DRUGid":"e28b7d9c-e817-47c1-b227-97d8eca021a7",\
                            "FREPid":"65dd5753-aad0-4261-94d3-09a67bd4f9a1",\
                            "quality":"9.0000", "sequence":"0", "illustration":""}')
        r = self.client.get('/api/fixedrecipe_item')
        self.assertEqual(json.loads(r.data)['num_results'], 2)

    def test_fixedrecipeItem_delete(self):
        r = self.client.delete('/api/fixedrecipe_item/9c18a29f-faa1-494d-839c-7a89cba439e8')
        r = self.client.get('/api/fixedrecipe_item')
        self.assertEqual(json.loads(r.data)['num_results'], 0)
        #drug shoule remain
        r = self.client.get('/api/drug')
        self.assertEqual(json.loads(r.data)['num_results'], 1)
        #fixedrecipe should remain
        r = self.client.get('/api/fixedrecipe')
        self.assertEqual(json.loads(r.data)['num_results'], 1)

if __name__ == '__main__':
    unittest.main()
