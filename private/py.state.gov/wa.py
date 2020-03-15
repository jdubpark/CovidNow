from bs4 import BeautifulSoup
from selenium import webdriver

url = 'https://www.doh.wa.gov/emergencies/coronavirus'
# driver = webdriver.Firefox()
chromedriver = '/Users/pjw/chromedriver'
options = webdriver.ChromeOptions()
options.add_argument('--enable-javascript')
driver = webdriver.Chrome(executable_path=chromedriver, options=options)

driver.get(url)
html = driver.page_source
soup = BeautifulSoup(html, features='html.parser')

print(html);
# case_table_rows = soup.find(id='dnn_ctr33855_ModuleContent')
# print(case_table_rows);
# for row in case_table_rows:
#     tds = [e.get_text() for e in row.find_all('td')]
#     print(', '.join(tds))

# from nltk.corpus import brown
# brown.words()
