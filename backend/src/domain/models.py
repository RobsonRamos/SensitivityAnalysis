from datetime import datetime
from dateutil.relativedelta import relativedelta

class RequestSettings:
    def __init__(self):
        self.start = (datetime.now() - relativedelta(years=1)).strftime('%d/%m/%Y')
        self.end = datetime.today().strftime('%d/%m/%Y')
        self.country = 'United States'