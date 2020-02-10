import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    const result = this.db
      .list('/categories', ref => ref.orderByChild('name'))
      // .valueChanges()
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(category => {
            const payload: any = category.payload.val();
            return { key: category.payload.key, ...payload };
          });
        })
      );

    return result;
  }
}
