import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userOservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userOservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Приветствуем в Пиццевом! ${user.name}`);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Ошибка входа!');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem('User', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('User');
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
