import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

   saveToStorage(home:string,current:string,completed:string,late:string) {
    localStorage.setItem('home', home);
    localStorage.setItem('current', current);
    localStorage.setItem('completed', completed);
    localStorage.setItem('late', late);
  }

}
