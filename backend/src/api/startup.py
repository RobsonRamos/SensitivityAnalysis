from flask import Flask
from flask_restful import Resource, Api, reqparse 
from flask_restful.utils import cors
from datetime import datetime  
from src.api.sensitivity_service import SensitivityService
from src.api.metrics_service import MetricsService 
from src.api.predicted_values_service import PredictedValuesService 
from flask_cors import CORS, cross_origin

class Startup: 
        def startAPI(self): 
                app = Flask(__name__)
                api = Api(app)
                CORS(app)
                api.add_resource(SensitivityService, '/sensitivityService')
                api.add_resource(MetricsService, '/metricsService')
                api.add_resource(PredictedValuesService, '/predictedValuesService')
                app.run(debug=False, port=5000, host='0.0.0.0') 