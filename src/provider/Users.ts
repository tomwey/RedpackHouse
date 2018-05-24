import {Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class Users {

    constructor(
        private storage: Storage,
    ) {

    }
    /**
     * 获取用户的登录TOKEN
     */
    token(): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get('token').then( val => {
                // resolve('aed672e8bbe94206995a78dc6cd6ed1b'); // 后台wmarshx用户的Token aed672e8bbe94206995a78dc6cd6ed1b
                // resolve('aa905ea8fca84485a7a4c2e1f0697cb5'); // 本地测试
                resolve(val)
            } );
        });
    }

    /**
     * 保存用户登录TOKEN
     * @param token 
     */
    saveToken(token: string): Promise<any> {
        return this.storage.set('token', token);
    }
}