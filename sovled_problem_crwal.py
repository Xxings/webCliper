#-*- coding:utf-8 -*-
from bs4 import BeautifulSoup
import requests as req

import json

###
# * SAMPLE CODE CRWALING
# * container : PROBLEM
###

header_login_load={
    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Sec-Fetch-User":"?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "navigate",
    "Referer": "https://www.acmicpc.net/",
}

with open('./dataSet/data.problem.json') as json_file:
    json_data = json.load(json_file)

# target= "https://api.solved.ac/problem_level.php?id="+str(19000)
# r = req.get(target)
# print(r.json())
# print(type(r.json()) is dict)

problems=[]
r=""
for data in json_data:
    problem = {'problem_id':data['problem_id']}
    target= "https://api.solved.ac/problem_level.php?id="+data['problem_id']
    try:
        r = req.get(url=target) 
    except:
        break
    if type(r.json()) is dict :
        problem.update(r.json())
    problems.append(problem)
    print(len(problems))
f = open("problem_level.json",'w')
f.write(json.dumps(problems))
f.close()