import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: firebase.User;
  user$: Observable<firebase.User>; // Updated code

  constructor(private fireAuth: AngularFireAuth) {
    // fireAuth.authState.subscribe((user: firebase.User) => (this.user = user));
    this.user$ = fireAuth.authState; // Updated code
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  login() {
    this.fireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
