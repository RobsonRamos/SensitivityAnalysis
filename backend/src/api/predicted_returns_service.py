from flask_restful import Resource, Api, reqparse
from flask import jsonify, Response, request
from src.core.linear_model import LinearModel 
import traceback
import json 

class PredictedReturnsService(Resource):
 
    def get(self):

        try:
            model = LinearModel()
            predicted_returns = list("{:.2f}".format(value) for value in model.df['PredictedReturn'])[1:]
            returns = list("{:.2f}".format(value) for value in model.df['Return'])[1:]
            index_values = list(str(value).replace(" 00:00:00","") for value in model.df.index)[1:]

            result = {
                "predictedReturns" : predicted_returns,
                "returns" : returns,
                "indexValues" : index_values
            }

            return Response(response=json.dumps(result),
                            status=200,
                            mimetype='application/json')
        except:
            traceback.print_exc()
            return Response(response="Internal server error", status=500)  