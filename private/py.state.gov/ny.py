from bs4 import BeautifulSoup

import requests

url = 'https://www.health.ny.gov/diseases/communicable/coronavirus/'
req = requests.get(url)
soup = BeautifulSoup(req.text, features='html.parser')

case_table_rows = soup.find(id='case_count_table').findChildren('tr')
print(case_table_rows);
for row in case_table_rows:
    tds = [e.get_text() for e in row.find_all('td')]
    print(', '.join(tds))

# from nltk.corpus import brown
# brown.words()
