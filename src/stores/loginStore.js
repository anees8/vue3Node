import { defineStore } from 'pinia'
import axios from "axios";
import router from "../router/index";

export const useLoginStore = defineStore("loginStore", {

    state: () => ({
        user: {
            email: "",
            password: "",
        },
        registeruser: {
            name: "",
            email: "",
            phone: "",
            password: "",
            
        },
        loading: false,
        errors: {},
        accessToken: localStorage.getItem("token"),
        

    }),
    
    actions: {
        async login() {
            this.loading = true;
          
            try {
            
            const response = await axios.post("api/login", this.user);
            this.setToken(response.data);
           
            if (response.data.token) {
                axios.defaults.headers.common["Authorization"] ="Bearer " + response.data.token;
            }
        } catch (error) {
          
                if (error.response) {
                if (error.response.status === 403) {
                router.push({ name: "NotAuthorize" });  
                } else if (error.response.status === 400) {
                
                this.errors = error.response.data;
            
                }
            }
            this.loading = false;
            setTimeout(() => {
                this.errors = {};
            }, 5000);

            };
        },
        async logout() {
            this.loading = true;
            try {
                const response = await axios.post("api/logout");
              
                this.loading = false;
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                            this.errors = error.response.data.errors;
                    }
                }
                this.loading = false;
                setTimeout(() => {
                    this.errors = {};
                }, 5000);

                
              
            }
        },
        removeToken: function () {
         this.logout();
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            router.push({ name: "Login" });
        },
        async register() {
            this.loading = true;
             
            try {
            
                const response = await axios.post("api/register", this.registeruser);
                this.loading = false;
                this.registeruser={
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    
                },
                router.push({ name: "Login" });
            } catch (error) {
              
                    if (error.response) {
                    if (error.response.status === 403) {
                    router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                    
                    this.errors = error.response.data.error;
                    
                
                    }
                }
                this.loading = false;
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
    
                };
          

        },
        setToken: function (data) {
            this.accessToken = data.token;
            localStorage.setItem("token", data.token);
            this.errors = {};
            this.user.email = null;
            this.user.password = null;
            this.loading = false;
            router.push({ name: "Dashboard" });
           
        },
    }


});