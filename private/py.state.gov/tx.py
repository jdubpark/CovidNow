from bs4 import BeautifulSoup

import requests

class Texas:
    def __init__(self):
        return
    def get(self):


url = 'https://www.dshs.state.tx.us/news/updates.shtm#coronavirus'
# for some reason, req on MacBook fails, so turn off verify
req = requests.get(url, verify=False)
soup = BeautifulSoup(req.text, features='html.parser')

""" only one table - cases """

table = soup.find('table')
thead = table.find('thead') # disregard thead for now
tbody = table.find('tbody')

# for row in thead.find_all('tr'):
#     print(row.get_text())
for row in tbody.find_all('tr'):
    tds = [e.get_text().rstrip() for e in row.find_all('td')]
    print(' '.join(tds))

# from nltk.corpus import brown
# brown.words()
