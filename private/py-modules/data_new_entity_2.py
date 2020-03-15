# new entity label
CASES = "CASES"
DEATHS = "DEATHS"
COUNTY = "COUNTY"

data = [
    (
        "The number of confirmed cases of coronavirus has increased to 366, including 29 deaths, the state Department of Health announced shortly after 2 p.m. Wednesday.",
        {"entities": [(14, 65, CASES), (77, 86, DEATHS)]},
    ),
    (
        "All but three of those deaths were in King County, followed by two in Snohomish county and one in Grant County. Thurston County also reported its first case on Wednesday.",
        {"entities": [(0, 29, DEATHS), (38, 49, COUNTY), (70, 86, COUNTY), (98, 110, COUNTY), (112, 127, COUNTY)]},
    ),
    (
        "Pierce County also saw its number of confirmed cases jump to 17, the data show.",
        {"entities": [(0, 13, COUNTY), (27, 63, CASES)]},
    ),
    (
        "King County: 234 cases, 26 deaths.",
        {"entities": [(0, 11, COUNTY), (13, 22, CASES), (24, 33, DEATHS)]},
    ),
    (
        "Snohomish County: 68 cases, 2 deaths.",
        {"entities": [(0, 16, COUNTY), (18, 26, CASES), (28, 36, DEATHS)]},
    ),
    (
        "Pierce County: 17 cases, no deaths.",
        {"entities": [(0, 13, COUNTY), (15, 23, CASES), (35, 44, DEATHS)]},
    ),
    (
        "Kitsap County: 2 cases, no deaths.",
        {"entities": [(0, 13, COUNTY), (15, 22, CASES), (34, 43, DEATHS)]},
    ),
    (
        "Grant County: 1 case, 1 death.",
        {"entities": [(0, 12, COUNTY), (14, 20, CASES), (22, 29, DEATHS)]},
    ),
    (
        "Clark, Island, Jefferson, Skagit, Thurston and Whatcom counties report a case each.",
        {"entities": [(0, 63, COUNTY), (71, 77, CASES)]},
    ),
]

def train_data():
    return data;
