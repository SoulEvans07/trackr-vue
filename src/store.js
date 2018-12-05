let store = {
    state: {
        user: {},
        tasks: [],
        projects: []
    },

    // Methods
    logout: function () {
        localStorage.removeItem('user');
        this.state.user = {};
    },
    login: function (user) {
        this.state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    }


};

export default store