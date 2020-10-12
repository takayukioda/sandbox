import * as Datastore from 'nedb';
import { Injectable } from '@nestjs/common';

type Subscription = { endpoint: string }

@Injectable()
export class AppService {
  constructor(private readonly db: Datastore) {}

  getHello(): string {
    return 'Hello World!';
  }

  saveSubscription(subscription: Subscription) {
    return new Promise((resolve, reject) => {
      this.db.insert(subscription, (err: unknown, newDoc: any) => {
        if (err) {
          reject(err);
          return
        }
        resolve(newDoc._id!);
      });
    });
  }

  getSubscriptions(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err: unknown, docs: any) => {
        if (err) {
          reject(err);
          return
        }
        resolve(docs);
      });
    });
  }

  deleteSubscription(id: string) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: id }, (err: unknown, affected: number) => {
        if (err) {
          reject(err);
          return
        }
        resolve(affected);
      });
    });
  }
}
