import { Component, signal } from '@angular/core';
import { Clock } from "./clock/clock";
import { Weather } from "./weather/weather";

@Component({
  selector: 'app-root',
  imports: [Clock, Weather],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('clock-weather-widget');
}
