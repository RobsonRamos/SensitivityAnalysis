from datetime import datetime
from src.domain.models import RequestSettings
import investpy
import pandas as pd

class DataLoader: 
    
    def load_data(self, settings : RequestSettings):
        client = InvestingClient()
        df_barrick = client.get_stock_data('GOLD', settings.start, settings.end, settings.country)
        df_gold = client.get_commodity_data('GOLD', settings.start, settings.end)
        df_copper = client.get_commodity_data('COPPER', settings.start, settings.end)
        stock_info = client.get_stock_information('GOLD', settings.country) 
        return (df_barrick, df_gold, df_copper, stock_info)

class InvestingClient: 
    def get_stock_data(self, stock, start, end, country = None):
        return investpy.get_stock_historical_data(stock, country, start,end)
    
    def get_commodity_data(self, commodity, start, end):        
        return investpy.get_commodity_historical_data(commodity, start, end)
    
    def get_stock_information(self, stock, country):
        return investpy.get_stock_information(stock, country)