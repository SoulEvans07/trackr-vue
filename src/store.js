let store = {
    user: {},

    // Methods
    logout: function () {
        localStorage.removeItem('user');
        this.user = {};
    },
    login: function (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    get: function () {
        return this.user;
    }
};

export default store