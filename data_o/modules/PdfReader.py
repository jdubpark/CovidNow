import sys

import tabula

# url = 'https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200314-sitrep-54-covid-19.pdf'
url = sys.argv[1]
# doc: https://readthedocs.org/projects/tabula-py/downloads/pdf/latest/
# MUST USE silent=True to supress stderr org.apache.pdfbox.pdmodel.font.PDCIDFontType2
# tabula.io.build_options(pages='all', silent=True, format='JSON')
df = tabula.read_pdf(url, pages='all', silent=True, format='JSON')

print(df)
sys.stdout.flush()
