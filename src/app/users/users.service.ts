import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly URL_API = `https://localhost:44328/api/users`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<any[]>(this.URL_API).pipe(tap(console.log));
  }

  private create(user) {
    return this.http.post(this.URL_API, user).pipe(take(1));
  }

  private update(user) {
    return this.http.put(`${this.URL_API}/${user.id}`, user).pipe(take(1));
  }

  save(user) {
    if (user.id) {
      return this.update(user);
    }
    return this.create(user);
  }

  getById(id) {
    return this.http.get<any>(`${this.URL_API}/${id}`);
  }

  remove(id) {
    console.log(id);
    console.log(`${this.URL_API}/${id}`);
    return this.http.delete(`${this.URL_API}/${id}`).pipe(take(1));
  }
}
