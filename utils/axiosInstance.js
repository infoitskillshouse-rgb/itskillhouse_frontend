import axios from "axios";

/* ===============================
   Axios Instance
================================= */

const instance = axios.create({

baseURL: import.meta.env.VITE_API_BASE_URL,

withCredentials:true 

});


/* ===============================
   Request Interceptor
================================= */

instance.interceptors.request.use(

(config)=>{

const token=localStorage.getItem("token");

if(token){
config.headers.Authorization=`Bearer ${token}`;
}

return config;

},

(error)=>Promise.reject(error)

);


/* ===============================
   Response Interceptor
================================= */

instance.interceptors.response.use(

(response)=>response,

(error)=>{

if(error.response?.status===401){

localStorage.removeItem("token");

window.location.href="/admin/login";

}

return Promise.reject(error);

}

);


export default instance;