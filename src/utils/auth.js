import history from './history';

export default class Auth {

    currentUser = null

    isAuthenticated() {

        return this.currentUser !== null;
    }

    setCurrentUser(currentUser) {

        this.currentUser = currentUser

    }
}