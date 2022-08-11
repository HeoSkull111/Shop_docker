import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { Shop } from 'src/models/shop.model';
@Injectable()
export class ShopService {
    db: admin.firestore.Firestore
    constructor() {
        this.db = admin.firestore();
    }
    async addItem(item: Shop) {
        if (item.id == undefined) {
            item.id = Date.now().toString();
        }
        item.dateCreate = new Date(Date.now()).toUTCString();
        await this.db.collection('shop').doc(item.id).set(item);
    }
    async getItemByID(id: string) {
        let item = await this.db.collection('shop').doc(id).get();
        return item.data();
    }
    async getAllItems() {
        let items = await this.db.collection('shop').get();
        return items.docs.map(item => item.data());
    }
    async updateItem(id: string,item: Shop) {
        await this.db.collection('shop').doc(id).set(item);
    }
    async deleteItem(id: string) {
        await this.db.collection('shop').doc(id).delete();
    }
}
