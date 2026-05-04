import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class Clock implements OnInit, OnDestroy {
  time = signal(new Date());
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  private now = this.time();
  private timerId: any;
  private secondRotation = this.now.getSeconds() * 6;

  ngOnInit() {
    // The clock owns its own interval so the UI keeps moving without outside input.
    this.timerId = setInterval(() => {
      this.time.set(new Date());
      // Keep the second hand moving forward continuously instead of snapping back at 0 seconds.
      this.secondRotation += 6;
    }, 1000);
  }

  ngOnDestroy() {
    // Clear the interval when Angular removes this component to avoid background timers.
    clearInterval(this.timerId);
  }

  getHourRotation() {
    const now = this.time();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();

    // Include minutes so the hour hand sits between hour marks like a real analog clock.
    return `rotate(${hours * 30 + minutes * 0.5}deg)`;
  }

  getMinuteRotation() {
    const now = this.time();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Include seconds so the minute hand eases forward during the minute.
    return `rotate(${minutes * 6 + seconds * 0.1}deg)`;
  }

  getSecondRotation() {
    return `rotate(${this.secondRotation}deg)`;
  }
}
