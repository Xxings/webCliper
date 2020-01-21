from bs4 import BeautifulSoup
import requests as req

import json

###
# * SAMPLE CODE CRWALING
# * container : SUBMIT
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
user_id ="gudrhks2"
# user_id="sdm821"
# user_id="kistone3"
# user_id = "prob1000"

login_url ="https://www.acmicpc.net/status?problem_id=&user_id="+user_id
# login_url = "https://www.acmicpc.net/status?problem_id=1000&from_problem=1"
s = req.session()
res =s.get(login_url,headers=header_login_load )
loginhtml = res.text
# print(res.text)


doc = BeautifulSoup(res.text, 'html.parser')

rows =doc.select('tr[id*="solution-"]')


solvedList = []
solved = {}
problems = []

# def solveSet(list):
#     res = []
#     for e in list:
#         if e not in problem:
#             res.append(e)
#             problem.add(e)
#     return res

def search_curStatus(rows):
    for r in rows:
        problem = {}
        tds =r.find_all('td')
        problem['submission_id'] = tds[0].text
        problem['problem_id'] = tds[2].a.text
        problem['problem_title'] = tds[2].a['title']
        problem['result'] = tds[3].findChild().findChild().attrs.get("class")[0]
        problem['memory'] = tds[4].text
        problem['time'] = tds[5].text
        problem['language'] = tds[6].text
        problem['length'] = tds[7].text
        problem['date'] = tds[8].a['data-timestamp']
        print(problem)
        print("\n")
        # if(problem['result'] == "reulst-ac"):
            # solved.add(problem['problem_id'])
            # solvedList.append(problem['problem_id'])
        problems.append(problem)

def search_nextStatus(doc):
    while(True):
        try:
            login_url = "https://www.acmicpc.net" + doc.find("a", id="next_page")["href"]
        except :
            break

        res = s.get(login_url, headers=header_login_load)
        loginhtml = res.text

        doc = BeautifulSoup(res.text, 'html.parser')
        rows = doc.select('tr[id*="solution-"]')
        search_curStatus(rows)

search_curStatus(rows)
search_nextStatus(doc)


f = open(user_id+".json",'w')
# print(problems,file=f)
f.write(json.dumps(problems))
# print(problems)
# print(solved)
f.close()