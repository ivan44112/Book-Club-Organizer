import axios from "axios";

let Service = axios.create({
    baseURL: '/auth/',
    timeout: 1000,
});


let Auth = {
    async login(email, password) {
        let response = await Service.post("/login", {
            email: email,
            password: password
        });

        let user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    async register(name, email, password) {
        let response = await Service.post('/register', {
            name: name,
            email: email,
            password: password,
        })

        let user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    logout() {
        localStorage.removeItem('user');
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export {Service, Auth};