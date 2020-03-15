import spacy
# nlp = spacy.load("en_core_web_sm")
nlp = spacy.load('en_core_web_lg')
# doc = nlp("This is a sentence.")
# doc = nlp("Westchester County, 108 "
#           "Nassau County, 19 "
#           "Rockland County, 6 "
#           "Saratoga County, 2 "
#           "Suffolk County, 1 "
#           "Ulster County, 1 "
#           "New York State (Outside of NYC), 137 "
#           "New York City, 36 "
#           "Total Positive Cases (Statewide), 173")
doc = nlp(
    'Alarming clusters of the coronavirus swelled on both coasts of the U.S. on Tuesday, with 70 cases now tied to a biotech conference in Boston and infections turning up at 10 nursing homes in the hard-hit Seattle area. '
    'The total cases in the U.S. is now more than 1,000, with 30 confirmed deaths, NBC News reports. '
    "Presidential candidates Bernie Sanders and Joe Biden abruptly canceled rallies because of worries about the virus, and New York’s governor announced he is sending the National Guard to scrub public places and deliver food in a New York City suburb that is at the center of the nation's biggest known cluster of infections. "
    'On Wednesday, Washington Gov. Jay Inslee will announce a ban on gatherings and events of more than 250 people in virtually the entire Seattle metro area to try to stop the spread of the outbreak, said a person involved in the planning of the decision. The order would not prohibit the operation of workplaces and is not expected to include school closures, said the person, who spoke on condition of anonymity because they weren’t authorized to discuss the matter publicly. '
    'Santa Clara County in California, home to San Jose and Silicon Valley, on Monday announced a ban on all gatherings of 1,000 people or more. '
    'At least 24 people have died in Washington from COVID-19, most in the Seattle metro area. Nineteen of the deaths are linked to one suburban Seattle nursing home and authorities in King County said the virus has spread to at least 10 long-term care facilities '
    'Late last month Inslee declared a state of emergency over the virus outbreak. There are more than 260 confirmed cases in the state, most in the three counties that would be affected by Inslee’s new order. '
    'Massachusetts Gov. Charlie Baker declared a state of emergency as cases statewide jumped by 51 from the day before, to 92. Of that number, 70 are now connected to a meeting held last month by biotech company Biogen at a hotel in downtown Boston. '
    'Authorities in Washington state reported two new deaths from the virus — a man and woman, both in their 80s, who were residents of a nursing home and a senior center. Of the 24 deaths in the state, 19 have been tied to a single nursing home, Life Care Center of Kirkland. But the state officials said they are now working with 10 nursing facilities where residents or workers have been tested positive. '
    'Washington Gov. Jay Inslee announced new nursing-home rules that would limit visitors and subject health care workers to screening. '
    'Similarly, in Kentucky, Gov. Andy Beshear said state-run nursing homes will severely restrict visitors, with private operators strongly urged to follow suit. Six cases have been diagnosed in the state. '
    'The decisions by both Democratic presidential candidates to call off rallies in Cleveland came as voters headed to the polls for a primary election in neighboring Michigan.'
    )
# print([(w.text, w.pos_) for w in doc])
# for w in doc:
#     print((w.text, w.pos_))
for ent in doc.ents:
    print(ent.label_, ' | ', ent.text) # spacy.explain(ent.label_)
# token.like_num for token in doc
