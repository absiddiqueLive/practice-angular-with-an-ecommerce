import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    const result = this.db
      .list('/categories', ref => ref.orderByChild('name'))
      // .valueChanges()
      .snapshotChanges();

    /*
    .pipe(
        map(changes => {
          console.log(changes);
          changes.map(c => {
            console.log(c);
            console.log({ id: c.payload.key, ...c.payload.val() });
            return { id: c.payload.key, ...c.payload.val() };
          });
        })
      );
      */

    return result;
  }
}
