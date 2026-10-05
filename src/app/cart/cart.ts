import { Component } from '@angular/core';
import { signal, WritableSignal, computed, effect } from '@angular/core';
import { Item } from '../item';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [TitleCasePipe],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  items : WritableSignal<Item[]>= signal<Item[]>([ 
    { id: 11, photo: 'articles/lait.jpg', name: 'lait', price: 1.35, quantity: 2 }, 
    { id: 12, photo: 'articles/pate.jpg', name: 'pâtes', price: 0.41, quantity: 1 }, 
    { id: 13, photo: 'articles/riz.jpg', name: 'riz', price: 3.8, quantity: 1 }, 
    { id: 14, photo: 'articles/yaourt.jpg',name:'yaourt', price: 0.6, quantity:6 }]);
  totalItems = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  totalPrice = computed(() => this.items().reduce((sum, item) => sum + item.price * item.quantity, 0));
  remise = computed(() => this.totalPrice() * 0.02);
  finalPrice = computed(() => this.totalPrice() > 100 ? this.totalPrice() - this.remise() : this.totalPrice());
  updateQuantity(item :Item, value :number){
    if(item.quantity + value <= 0){
      this.items.update(items => items.filter(item1 => item1.id != item.id));
    }
    this.items.update(items => items.map(item1 => item1.id == item.id ? {...item1, quantity: item1.quantity + value} : item1));
  }
  constructor() {
    effect(() => {console.log('items:', this.items());});
  }
  addItem(){
    let newId = this.items().reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
    this.items.update(items => [...items, { id: newId, photo: 'articles/eau.jpg', name: 'bouteille d’eau', price: 0.7, quantity: 1 }]);
  }
  deleteItem(itemNameInput: any) {
    this.items.update(items => items.filter(item => item.name !== itemNameInput.value));
  }

}