import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  saveAllToStorage(home: string, current: string, completed: string, late: string) {
    localStorage.setItem('home', home);
    localStorage.setItem('current', current);
    localStorage.setItem('completed', completed);
    localStorage.setItem('late', late);
  }

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
