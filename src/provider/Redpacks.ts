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

    OpenRedpack(id, answer) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST('redpack/take', { token: token, id: id, sign: answer })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetCatalogs() {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('catalogs', { token: token })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetRedpackThemes(cid) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('themes', { cid: cid, token: token })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetRedpackAudios(cid) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('audios', { cid: cid, token: token })
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