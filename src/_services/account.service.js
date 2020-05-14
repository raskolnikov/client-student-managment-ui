import { BehaviorSubject } from 'rxjs'

import { history } from '../_helpers'


const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')))

export const accountService = {

    login,
    logout,
    update,

    delete: _delete,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value }

}


function login(userData) {

}

function logout() {


}

function update() {

}

function _delete() {


}