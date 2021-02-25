from sklearn import linear_model 
import pandas as pd
import numpy as np

class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class LinearModel(metaclass=Singleton):
    _instance = None

    def __init__(self):
        self.reg = linear_model.LinearRegression()
        self.matrix_dimension = 11

    def generate_model(self, df_barrick, df_gold, df_copper, stock_info):
        df = pd.concat([ df_barrick['Close'], df_gold['Close'],df_copper['Close']],axis=1)
        df.columns = ['Barrick',  'Gold', 'Copper']
        df.dropna(inplace = True) 
        x = pd.concat( [df['Gold'], df['Copper'] ], axis = 1) 
        y = df['Barrick']
        self.reg.fit(x, y)
        self.df = df
        self.stock_info = stock_info
        self.generate_values(x, y) 

    def generate_values(self, x, y):   
        predicted = []
        for _, row in x.iterrows():  
            predicted.append(self.reg.predict([[row['Gold'], row['Copper']]])[0])
        self.df['Predicted'] = predicted         
        
    def predict(self, shift_gold, shift_copper):
        shift_gold = abs(shift_gold)
        shift_copper = abs(shift_copper)

        df = pd.DataFrame()

        index_name = ['Copper'] * self.matrix_dimension
        column_name = ['Gold'] * self.matrix_dimension
        index_values = []
        column_values = []
        predicted_values = np.zeros((self.matrix_dimension,self.matrix_dimension))
        count_columns = 0

        for pct_change_copper in np.arange( -shift_copper, shift_copper + 1, (shift_copper * 2) / (self.matrix_dimension -1) ):    
            index_values.append(str(pct_change_copper) + '%') 
            count_columns = 0
            price_copper = self.df['Copper'][-1] * ( 1 + pct_change_copper / 100 )

            for pct_change_gold in np.arange( -shift_gold, shift_gold + 1, (shift_gold * 2) / (self.matrix_dimension -1) ):        
                if(len(column_values) < self.matrix_dimension):
                    column_values.append(str(pct_change_gold) + '%') 

                price_gold = self.df['Gold'][-1] * ( 1 + pct_change_gold / 100)    
                predicted_value = self.reg.predict([[price_gold, price_copper]])[0] 
                predicted_values[len(index_values) -1][count_columns] = float("{:.2f}".format(predicted_value / self.stock_info['EPS'][0]))
                count_columns = count_columns + 1

        index = pd.MultiIndex.from_tuples(list(zip(index_name,index_values)))
        columns = pd.MultiIndex.from_tuples(list(zip(column_name,column_values)))
        df = pd.DataFrame(predicted_values,index=index,columns=columns) 
        return df
