
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // These values are kept here so the component only cares about displaying weather data.
  private apiKey = '4404a3b5e2f0fd5cb7677b08ed19104e';
  private city = 'Nottingham';

  constructor(private http: HttpClient) {}

  getWeather() {
    // Request metric units so the widget can display Celsius directly without extra conversion.
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`
    );
  }
}
