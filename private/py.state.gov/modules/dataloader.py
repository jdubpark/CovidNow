import request

from bs4 import BeautifulSoup

class DataLoader():
    def __init__(self):
        self.url = ''
        return

    """ fetch content from url """
    def get(self):
        req = requests.get(self.url, verify=False)
        return

    """ clean fetched data, use with get() """
    def clean(self, data):
        cleaned = {}

        return cleaned
