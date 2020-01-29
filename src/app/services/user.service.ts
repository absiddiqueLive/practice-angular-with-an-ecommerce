import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';

import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  // Update user in firebase
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  // Fetch user from firebase
  get(userUid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + userUid);
  }
}
