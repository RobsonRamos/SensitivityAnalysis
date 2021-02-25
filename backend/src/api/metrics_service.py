from flask_restful import Resource, Api, reqparse
from flask import jsonify, Response, request
from src.core.linear_model import LinearModel 
import traceback
import json 

class MetricsService(Resource):
 
    def get(self):

        try:
            model = LinearModel()
            result = {}
            result = {
                "intercept" : model.reg.intercept_,
                "coefficientGold" :  model.reg.coef_[0],
                "coefficientCopper" :  model.reg.coef_[1],
                "lastBarrickPrice" : model.df['Barrick'][-1],
                "lastGoldPrice" : model.df['Gold'][-1],
                "lastCopperPrice" : model.df['Copper'][-1],
                "eps" : model.stock_info['EPS'][0],
                "pe" : "{:.2f}".format(model.df['Barrick'][-1] / model.stock_info['EPS'][0])
            }
            return Response(response=json.dumps(result),
                            status=200,
                            mimetype='application/json')
            #else:
            #    return Response(response="The field cnpj are required", status=400)
         
        except:
            traceback.print_exc()
            return Response(response="Internal server error", status=500)  