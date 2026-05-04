
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather implements OnInit {
  weather = signal<any>(null);
  error = signal('');

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // Load once when the widget appears; signals keep the template in sync with the response state.
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        this.weather.set(data);
      },
      error: () => {
        this.error.set('Weather could not be loaded');
      }
    });
  }

  getIconUrl() {
    // OpenWeather sends only an icon code, so the full image URL is built at display time.
    const icon = this.weather()?.weather?.[0]?.icon;
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
