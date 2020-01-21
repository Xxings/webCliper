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

_START = 1
_LOOP = _START
_END = 173

problems = []
def search_curStatus(rows):
    for r in rows:
        problem = {}
        tds =r.find_all('td')
        problem['problem_id'] = tds[0].text
        problem['problem_title'] = tds[1].a.text
        problem['n_success'] = tds[3].text
        problem['n_submit'] = tds[4].a.text
        problem['is_boj'] = "Y" if len(tds[2].findAll("span", {"class": "label-purple"}))>0 else "N"
        # print(problem)
        problems.append(problem)

while(_LOOP <= _END):
    print("%d of %d" %(_LOOP, _END) )
    try:
        problem_url ="https://www.acmicpc.net/problemset/"+str(_LOOP)
    except :
        break
    s = req.session()
    res =s.get(problem_url,headers=header_login_load )
    doc = BeautifulSoup(res.text, 'html.parser')
    rows = doc.select('tbody > tr')
    search_curStatus(rows)
    _LOOP+=1;

f = open("problem.json",'w')
f.write(json.dumps(problems))
f.close()