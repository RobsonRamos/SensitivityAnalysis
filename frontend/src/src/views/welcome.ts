import 'jquery-visible';
import 'popper.js';
import 'bootstrap';
import 'velocity-animate';
import * as Chart from 'chart.js';
import { autoinject } from 'aurelia-dependency-injection';  
import { ScriptRunner } from '../services/scriptRunner';
import { NotificationService } from '../services/notificationService'; 
import { Rest, Config } from 'aurelia-api'; 
import { HttpClient } from 'aurelia-fetch-client'; 

@autoinject
export class Welcome{
   
    isLoading                               : boolean; 
    pctChangeGold                           : number;
    pctChangeCopper                         : number; 
    api                                     : Rest;
    result                                  : any;
    metrics                                 : any;
    predictedValues                         : any;
    predictedReturns                        : any;
    
    constructor( 
        private config                      : Config,
        private client                      : HttpClient,
        private notification                : NotificationService ) { 
        this.isLoading = false; 
        this.api = this.config.getEndpoint('apiAddress'); 

        this.client.configure(config => {
            config.withBaseUrl(this.api.client.baseUrl);
        });  
    } 

    attached(){
        
        window.setTimeout(() => ScriptRunner.runScript(), 10);
        this.loadMetrics();
        this.loadPredictedValues();
        this.loadPredictedReturns();
    }

    activate(params){ 
    } 
    
    loadPredictedValues(){  
         
        return this.client
                     .fetch('predictedValuesService', { method: 'GET'} )  
                     .then(response => {      
                         if(response.status != 200){
                             throw "Error";
                         }           
                         return response;
                     }) 
                     .then(response=> response.json())
                     .then(data=> this.predictedValues = data) 
                     .then(_ => this.drawPredictedValues())
                     .catch( (e) => {
                         console.log(e);
                         return Promise.resolve(e.json().then( error => {
                             throw error;
                         }));
                     });

    }
    
    loadPredictedReturns(){  
         
        return this.client
                     .fetch('predictedReturnsService', { method: 'GET'} )  
                     .then(response => {      
                         if(response.status != 200){
                             throw "Error";
                         }           
                         return response;
                     }) 
                     .then(response=> {
                         debugger;
                         return response.json()
                     })
                     .then(data=> {
                         debugger;
                         this.predictedReturns = data;
                     }) 
                     .then(_ => this.drawPredictedReturns())
                     .catch( (e) => {
                         console.log(e);
                         return Promise.resolve(e.json().then( error => {
                             throw error;
                         }));
                     });

    }

    loadMetrics(){  
         
        return this.client
                     .fetch('metricsService', { method: 'GET'} )  
                     .then(response => {      
                         if(response.status != 200){
                             throw "Error";
                         }           
                         return response;
                     }) 
                     .then(response=> response.json())
                     .then(data=> this.metrics = data)
                     .catch( (e) => {
                         console.log(e);
                         return Promise.resolve(e.json().then( error => {
                             throw error;
                         }));
                     });
 
     }

    calculate(){  

        if(this.pctChangeCopper == null || (<any> this.pctChangeCopper) == ''){
            this.notification.error('The  change for copper commodity is required');
        }

        else if(this.pctChangeGold == null || (<any> this.pctChangeGold) == ''){
            this.notification.error('The  change for Gold commodity is required');
        }

        else{

            return this.client
                            .fetch('sensitivityService?shift_gold=' + this.pctChangeGold + '&shift_copper=' + this.pctChangeCopper, { method: 'GET'} )  
                            .then(response => {      
                                if(response.status != 200){
                                    throw "Error";
                                }           
                                return response;
                            }) 
                            .then(response=>response.json())
                            .then(data=> this.result = data)
                            .then(_ => this.formatTable())
                            .catch( (e) => {
                                console.log(e);
                                return Promise.resolve(e.json().then( error => {
                                    throw error;
                                }));
                            });
        }
    }

    formatTable(){
        let pe = Number($( $('#htmlTable > table > tbody > tr > td')[60]).text());

        $('#htmlTable > table > tbody > tr > td').each(function( index ) {
            var number = Number( $(this).text());

            if(number == pe){
                $(this).css('color', 'blue');
                $(this).css('background-color', 'bisque');
            }
            else if(number > pe){
                $(this).css('color', '#0ad251');
            }
            else{
                $(this).css('color', '#f43a59'); 
            }
          });

          $('#htmlTable > table > tbody > tr > th').each(function( index ) {

            var number = Number($(this).text().replace('%',''));

            if(number > 0){
                $(this).css('color', '#0ad251');
            }
            else if(number < 0){
                $(this).css('color', '#f43a59'); 
            }
          });

          $('#htmlTable > table > thead > tr > th').each(function( index ) {
              
            var number = Number($(this).text().replace('%',''));

            if(number > 0){
                $(this).css('color', '#0ad251');
            }
            else if(number < 0){
                $(this).css('color', '#f43a59'); 
            }
          });
    }

    drawPredictedValues(){

		var lineChartData = {
			labels: this.predictedValues.indexValues,
			datasets: [{
				label: 'Predicted Prices',
				borderColor: 'red',
				backgroundColor: 'red',
				fill: false,
				data: this.predictedValues.predictedValues,
				yAxisID: 'y-axis-1',
			}, {
				label: 'Barrick Values',
				borderColor: 'blue',
				backgroundColor: 'blue',
				fill: false,
				data: this.predictedValues.barrickValues,
				yAxisID: 'y-axis-2'
			}]
		};
 
			var ctx = ( <any> document.getElementById('predictedValuesChart')).getContext('2d');
			Chart.Line(ctx, {
				data: lineChartData,
				options: {
					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title: {
						display: false
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',

							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
					}
				}
			}); 
	
    }

    drawPredictedReturns(){

		var lineChartData = {
			labels: this.predictedReturns.indexValues,
			datasets: [{
				label: 'Predicted Returns',
				borderColor: 'red',
				backgroundColor: 'red',
				fill: false,
				data: this.predictedReturns.predictedReturns,
				yAxisID: 'y-axis-1',
			}, {
				label: 'Barrick Returns',
				borderColor: 'blue',
				backgroundColor: 'blue',
				fill: false,
				data: this.predictedReturns.returns,
				yAxisID: 'y-axis-2'
			}]
		};
 
			var ctx = ( <any> document.getElementById('predictedReturnsChart')).getContext('2d');
			Chart.Line(ctx, {
				data: lineChartData,
				options: {
					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title: {
						display: false
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',

							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
					}
				}
			}); 
	
    }
}