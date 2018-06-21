import { NgModule } from '@angular/core';
import { EnvironmentVariables, applicationConfig } from './env';

declare const process: any; // Typescript compiler will complain without this

@NgModule({
  providers: [
    {
      provide: EnvironmentVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useClass: applicationConfig[process.env.IONIC_APPLICATION_ENV]
    }
  ]
})
export class EnvironmentsModule {}