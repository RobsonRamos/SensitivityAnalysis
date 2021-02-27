from flask_restful import Resource, Api, reqparse
from flask import jsonify, Response, request
from src.core.linear_model import LinearModel 
import traceback
import json 

class PredictedValuesService(Resource):
 
    def get(self):

        try:
            model = LinearModel()
            predicted_values = list("{:.2f}".format(value) for value in model.df['Predicted']) 
            barrick_values = list(value for value in model.df['Barrick'])
            index_values = list(str(value).replace(" 00:00:00","") for value in model.df.index)

            result = {
                "predictedValues" : predicted_values,
                "barrickValues" : barrick_values,
                "indexValues" : index_values
            }
            return Response(response=json.dumps(result),
                            status=200,
                            mimetype='application/json')
        except:
            traceback.print_exc()
            return Response(response="Internal server error", status=500)  