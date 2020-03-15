import sys

# never name the file spacy.py
# - it's going to overshadow spacy module #https://github.com/explosion/spaCy/issues/2078
import spacy

model = 'en_core_web_md'
nlp = spacy.load(model)

# text = sys.argv[1] # from child_process
text = 'As of March 13, 2020, 8 a.m. Pacific DaylightTime, there are a total of 247 positive cases and five deaths in California (including one non-California resident). This total does not include passengers from the Grand Princess cruise ship currently docked in Oakland.'
doc = nlp(text)

# data to send back to nodejs
# print(doc.ents)
ents = [(e.text, e.label_) for e in doc.ents]
print(ents)
sys.stdout.flush()
