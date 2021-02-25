import { ScriptRunner } from './services/scriptRunner';   
import { autoinject, Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration, NavigationInstruction } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Rest, Config } from 'aurelia-api'; 
import { EventAggregator } from 'aurelia-event-aggregator';
import { NotificationService } from './services/notificationService'; 

import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'mdbootstrap';
import 'velocity-animate';
import 'velocity';
import 'custom-scrollbar';
import 'jquery-visible';
import 'ie10-viewport';   


@autoinject
export class App {
  		
	
  	$ 						: any;
	api 					: Rest; 
	router 					: Router;   
	routerConfig			: RouterConfiguration;

	constructor(private aurelia					: Aurelia, 
				private config					: Config,
				private ea						: EventAggregator, 
				private nService 				: NotificationService) {  

		this.api = this.config.getEndpoint('apiAddress'); 
	} 
	

	configureRouter(config: RouterConfiguration, router: Router): void {
		
		config = config;
		config.title = 'Sensitivity Analysis'; 
		this.router = router;
		this.addRoutes(config, router); 
	}	

	attached() : void { 
		 
		ScriptRunner.runScript(); 
		var other = this; 
	}	

 
    addRoutes(config: RouterConfiguration, router: Router): void {

        config.map([
            { route: '', 		redirect: 'master' }, 
			{ route: 'master', 	name: 'master', moduleId: PLATFORM.moduleName('./views/master') } 
			
        ]);

        config.mapUnknownRoutes({ route: 'master' }); 
        config.fallbackRoute('master');
    }

   logout() : void {
		window.location.assign('/'); 
   }
}
