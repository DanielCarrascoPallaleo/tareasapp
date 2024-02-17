import axios from 'axios'
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: ()=> ({authUser: null, authToken: null }),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken
    },
    actions: {
        async getToken(){
            await axios.get('/sanctum/scrf-cookie');
        },
        async login(form){
            await axios.post('http://127.0.0.1:8000/api/login', form).then(
                (res)=> {
                    this.authToken = res.data.token;
                    this.authUser = res.data;
                    this.router.push('/tasks')
                }
            ).catch(
                (errors)=>{
                    let desc = '';
                    errors.response.data.errors.map(
                        (e) =>{desc = desc + ' ' + e}
                    )
                    console.log(desc, 'error login', '');
                }
            )
        },
        async register(form){
            await axios.post('http://127.0.0.1:8000/api/register', form).then(
                (res)=> {
                    console.log(res.data.message);
                    setTimeout(()=>this.router.push('login', 2000));
                }
            ).catch(
                (errors)=>{
                    let desc = '';
                    errors.response.data.errors.map(
                        (e) =>{desc = desc + ' ' + e}
                    )
                    console.log(desc, 'error', '');
                }
            )
        },
        async logout() {
            console.log(this.authToken);
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                }
            };
        
            try {
                await axios.get('http://127.0.0.1:8000/api/auth/logout', config);
                this.authToken = null;
                this.authUser = null;
                this.router.push('/login');
            } catch (error) {
                // Manejar errores, por ejemplo, un token no válido
                console.error(error);
            }
        }
        
    },
    persist:true
})