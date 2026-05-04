import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // The weather service depends on HttpClient, so it must be provided at app startup.
    provideHttpClient()
  ]
};
