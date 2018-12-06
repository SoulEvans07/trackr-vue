import axios from 'axios'

class ApiService {
    constructor() {
        this._axios = axios.create({
            baseURL: 'http://127.0.0.1:3000/api'
        });
    }

    setAuthToken() {
        let user = localStorage.getItem('user');
        if (user) {
            try {
                user = JSON.parse(user);
                this._axios.defaults.headers.common['Authorization'] = user.token;
            } catch (e) {
                console.error('Can not parse localstorage', e);
            }
        }
    }

    logout(){
        this._axios.defaults.headers.common['Authorization'] = null;
    }

    get(url, data) {
        this.setAuthToken();
        return this._axios({
            method: 'get',
            url: url,
            data: data
        });
    }

    post(url, data) {
        this.setAuthToken();
        return this._axios({
            method: 'post',
            url: url,
            data: data
        });
    }

    update(url, data) {
        this.setAuthToken();
        return this._axios({
            method: 'post',
            url: url,
            data: data
        });
    }

    delete(url) {
        return this._axios({
            method: 'delete',
            url: url,
        });
    }
}

export default new ApiService();