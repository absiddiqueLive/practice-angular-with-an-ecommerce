import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

import { AppUser } from '../models/app-user';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: firebase.User;
  user$: Observable<firebase.User>; // Updated code

  constructor(
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private userService: UserService
  ) {
    // fireAuth.authState.subscribe((user: firebase.User) => (this.user = user));
    this.user$ = fireAuth.authState; // Updated code
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  login() {
    const retuenUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', retuenUrl);

    this.fireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  // Get app user observable
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      })
    );
  }
}
