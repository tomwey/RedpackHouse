import {Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { Users } from "./Users";

@Injectable()
export class Redpacks {

    constructor(
        private api: ApiService,
        private users: Users,
    ) {

    }

    GetRedback(id) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('redpack/detail', { token: token, id: id })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
        
    }
}