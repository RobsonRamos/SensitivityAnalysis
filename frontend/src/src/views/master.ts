import { Router, RouterConfiguration } from 'aurelia-router'; 
import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-dependency-injection';   
import { ScriptRunner } from '../services/scriptRunner';  
import { NotificationService } from '../services/notificationService';  
import { PLATFORM } from 'aurelia-pal';
import 'jquery-visible';
import 'popper.js';
import 'bootstrap';
import 'velocity-animate';

@autoinject
export class Master {
 
    router                  : Router;
    isLogged                : boolean; 
    isLoading               : boolean;  
    notifications 			: Notification[]; 
	message					: string;
 
    constructor( 
        private nService 				: NotificationService,  
        private ea                      : EventAggregator) {
			
        this.ea.subscribe('loadingData', (param) => {
			this.isLoading = true;
			if(param && param.message){
				this.message = param.message;
			}
		});

        this.ea.subscribe('dataLoaded', () => { 
			window.setTimeout(() => {
				this.isLoading = false;
				this.message = null;
			}, 500);
		});
	}

	 
	addRoutes(config: RouterConfiguration, router: Router) : void {   

		config.map([    				
			{ route: '', redirect: 'welcome' },
			{ route: 'welcome', name: 'welcome',  moduleId: PLATFORM.moduleName('./welcome')}
		]);

        config.mapUnknownRoutes({ route: null, redirect: '/' });
    } 
	
    attached() { 
        ScriptRunner.runScript(); 
        this.load();
    }

	load(){ 

	}
  

    canActivate(params, routeConfig, navigationInstruction): boolean {
        return true;
    } 

    configureRouter(config: RouterConfiguration, router: Router): void {

        config.title = '';

        this.router = router;
        this.addRoutes(config, router);
    } 
     
}
