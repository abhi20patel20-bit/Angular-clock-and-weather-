import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class Clock implements OnInit, OnDestroy {

  //injecting the weather service here so we can call the API and display the temperature in the clock widget. You can remove this if you want to keep the clock and weather separate.
  constructor(private weatherService: WeatherService) {}

  // Stores the current time. Signal tells Angular to update the screen when it changes.
  time = signal(new Date());

  // Creates 60 small marks around the clock face, one for each second/minute.
  ticks = Array.from({ length: 60 }, (_, i) => i);

  // Text shown inside the date pill.
  currentDate = '';

  // Temperature value from the weather API; shown in the temperature pill. It can be null before the API responds, so the template can show a loading state or hide the pill until then.
  temperature = signal<number | null>(null);

  // Stores the timer so we can stop it when the component is destroyed.
  private timerId: any;

  // Keeps the second hand moving forward instead of jumping backwards at 60 seconds.
  secondRotation = 0;

  ngOnInit() {
    // Set the date when the clock first loads.
    this.updateDate();

    // Start second hand in the correct position based on current seconds.
    const now = new Date();
    this.secondRotation = now.getSeconds() * 6;

    // 👉 CALL WEATHER API
    this.weatherService.getWeather().subscribe({
      next: (data: any) => {
        this.temperature.set(Math.round(data.main.temp));
      },
      error: () => {
        console.error('Weather failed to load');
      }
    });

    // Update the clock every second.
    this.timerId = setInterval(() => {
      this.time.set(new Date());

      // Move second hand forward by 6 degrees every second.
      this.secondRotation += 6;

      // Keep date text updated.
      this.updateDate();
    }, 1000);
  }

  ngOnDestroy() {
    // Stop the timer when leaving the page to avoid memory leaks.
    clearInterval(this.timerId);
  }

  updateDate() {
    // Get the latest time from the signal.
    const now = this.time();

    // Format date like: MON, MAY 04
    this.currentDate = now
      .toLocaleDateString('en-GB', {
        weekday: 'short',
        month: 'short',
        day: '2-digit'
      })
      .toUpperCase()
      .replace(',', ', ');
  }

  getHourRotation() {
    const now = this.time();

    // Clock has 12 hours. Each hour = 30 degrees.
    const hours = now.getHours() % 12;

    // Minute value slightly moves the hour hand between numbers.
    const minutes = now.getMinutes();

    return `rotate(${hours * 30 + minutes * 0.5}deg)`;
  }

  getMinuteRotation() {
    const now = this.time();

    // Each minute = 6 degrees.
    const minutes = now.getMinutes();

    // Seconds slightly move the minute hand between minute marks.
    const seconds = now.getSeconds();

    return `rotate(${minutes * 6 + seconds * 0.1}deg)`;
  }

  getSecondRotation() {
    // Use the continuously increasing value so it does not visually jump backwards.
    return `rotate(${this.secondRotation}deg)`;
  }
}
