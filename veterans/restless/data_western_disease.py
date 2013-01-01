#coding=utf-8
#these is not the whole data from sqlserver, only 1000 rows
import syspath_config
from models import db, western_disease

db.create_all()
new_western_disease=western_disease(WDISid='a143856a-1b42-4d34-9b96-b6e52b4ebd42',code='001002007',name='放射性肺炎',parentcode='001002',level='3',isClassical='1',SPETid=' ',illustration=' ',createDay='2008-05-06 20:19:53.000',optrid=' ',state='3')
db.session.add(new_western_disease)
new_western_disease=western_disease(WDISid='77b19659-b9e3-401a-bec5-955177df7799',code='001003025',name='麦胶性肠病',parentcode='001003',level='3',isClassical='1',SPETid=' ',illustration=' ',createDay='2008-05-06 20:19:54.000',optrid=' ',state='3')
db.session.add(new_western_disease)
new_western_disease=western_disease(WDISid='2ef498c9-5310-4dc4-812a-d35a9e22a96c',code='001003094',name='α1-抗胰蛋白酶缺乏症',parentcode='001003',level='3',isClassical='1',SPETid='',illustration='',createDay='2008-05-06 20:19:56.000',optrid='',state='3')
db.session.add(new_western_disease)
new_western_disease=western_disease(WDISid='8fe96037-0801-4a20-aee1-e73f911eb373',code='001003161',name='特发性非硬化性门脉高压综合征',parentcode='001003',level='3',isClassical='1',SPETid='',illustration='',createDay='2008-05-06 20:19:57.000',optrid='',state='3')
db.session.add(new_western_disease)
new_western_disease=western_disease(WDISid='96217752-fc32-4cf9-a908-0f5447b7ec64',code='001004014',name='慢性淋巴细胞性白血病',parentcode='001004',level='3',isClassical='1',SPETid='',illustration='',createDay='2008-05-06 20:19:58.000',optrid='',state='3')
db.session.add(new_western_disease)
db.session.commit()

