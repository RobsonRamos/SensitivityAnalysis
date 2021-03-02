from flask_restful import Resource, Api, reqparse
from flask import jsonify, Response, request
from src.core.linear_model import LinearModel 
import traceback
import json 

class SensitivityService(Resource):
 
    def get(self):

        try: 
            shift_gold = float(request.args.get('shift_gold'))
            shift_copper = float(request.args.get('shift_copper'))

            model = LinearModel()
            result = model.predict(shift_gold, shift_copper) 
            return Response(response=json.dumps(result.to_html()),
                            status=200,
                            mimetype='application/json')
         
        except:
            traceback.print_exc()
            return Response(response="Internal server error", status=500)  