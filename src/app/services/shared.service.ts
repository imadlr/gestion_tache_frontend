import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  saveToStorage(key: string, data: any): void {
    localStorage.setItem(key, data);
  }

  loadFromStorage(key: string): any {
    return localStorage.getItem(key);
  }

  removeFromStorage(key: string): void {
    localStorage.removeItem(key);
  }

}
