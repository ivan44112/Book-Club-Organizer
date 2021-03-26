import axios from "axios";

let Service = axios.create({
    baseURL: 'http://localhost:5000/auth/',
    timeout: 1000,
});



let Auth = {
    async login(email, password){
        let response = await Service.post("/login",{
            email : email,
            password : password
        });

        let user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    logout() {
        localStorage.removeItem('user');
    },
    getUser(){
        return JSON.parse(localStorage.getItem('user'));
    },
    getToken(){
        let user = Auth.getUser();
        if(user){
            return user;
        }else{
            return false;
        }
    },
};

export{ Service, Auth };