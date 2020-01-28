import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: firebase.User;
  user$: Observable<firebase.User>; // Updated code

  constructor(private fireAuth: AngularFireAuth, private route: ActivatedRoute) {
    // fireAuth.authState.subscribe((user: firebase.User) => (this.user = user));
    this.user$ = fireAuth.authState; // Updated code
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  login() {
    const retuenUrl: string = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', retuenUrl);

    this.fireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
