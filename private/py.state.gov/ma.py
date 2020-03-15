from bs4 import BeautifulSoup

import requests

url = 'https://www.mass.gov/info-details/covid-19-cases-quarantine-and-monitoring#covid-19-cases-in-massachusetts-'
req = requests.get(url)
soup = BeautifulSoup(req.text, features='html.parser')

tables = soup.find_all('table')
for table in tables:
    trs = table.findChildren('tr')
    print(trs.findChildren('th'))
    # tds = [e.get_text() for e in trs.find('td')]
    # print(', '.join(tds))

# from nltk.corpus import brown
# brown.words()
