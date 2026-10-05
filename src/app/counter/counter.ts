import { Component, effect } from '@angular/core';
import { signal, computed } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-counter',
  styleUrl: './counter.css',
  templateUrl: './counter.html',
})
export class Counter {
  value = signal(0);
  square = computed(() => this.value() * this.value());
  even = computed(() => this.value() % 2 == 0);
  initValeur() {
    this.value.set(0);
  }
  incrementValeur(){
    this.value.set(this.value() + 1);
  }
  constructor() {
    effect(() => {
      console.log(`Valeur: ${this.value()}`);
    });
  }
}

