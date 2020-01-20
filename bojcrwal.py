from bs4 import BeautifulSoup
import requests as req


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
user_id ="sdm821"



login_url ="https://www.acmicpc.net/status?problem_id=&user_id="+user_id
s = req.session()
res =s.get(login_url,headers=header_login_load )
loginhtml =res.text
print(res.text)


doc = BeautifulSoup(res.text, 'html.parser')

rows =doc.select('tr[id*="solution-"]')
solved =set()

for r in rows:
    tds =r.find_all('td')
    res = tds[3].findChild().findChild().attrs.get("class")[0]
    print(res)
    if(res == "result-ac"):
        solved.add(tds[2].text)

while(True):
    try:
        login_url = "https://www.acmicpc.net" + doc.find("a", id="next_page")["href"]
    except :
        break

    res = s.get(login_url, headers=header_login_load)
    loginhtml = res.text

    doc = BeautifulSoup(res.text, 'html.parser')
    rows = doc.select('tr[id*="solution-"]')

    for r in rows:
        tds = r.find_all('td')
        res = tds[3].findChild().findChild().attrs.get("class")[0]
        print(res)
        if (res == "result-ac"):
            solved.add(tds[2].text)


print(len(solved))
