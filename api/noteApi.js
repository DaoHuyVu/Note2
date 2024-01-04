import axios, { Axios } from 'axios'
import  * as SecureStore from 'expo-secure-store'
const BASE_URL = "https://terrier-modern-violently.ngrok-free.app"
const axiosInstance = axios.create({baseURL : BASE_URL})
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('accessToken')
        if(!config.url.includes("/api/auth/login") && !config.url.includes("/api/auth/signup")){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },(error) => {
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalConfig = error.config
        if(error.response){
            if(error.response.status === 403 && !originalConfig.retry){
                originalConfig.retry = true
                try{
                    const refreshToken = await SecureStore.getItemAsync('refreshToken')
                    const response = await api.refreshToken(refreshToken)
                    await SecureStore.setItemAsync('accessToken',response.data.accessToken)
                    return axiosInstance(originalConfig)
                }catch(_error){
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                      }
                      return Promise.reject(_error);
                    }
                }
            }
        }
)

export const api = {
    add : async (note) => {
            return await axiosInstance.post("/note",null,{
                params : {
                    name : note.name,
                    description : note.description,
                    createdAt : note.createdAt,
                    done : 'false'
                }
            })
    },
    delete : async (id) => {
        return await axiosInstance.delete(`/note/${id}`)
    },
    update : async (id,obj) => {
        return await axiosInstance.patch(`/note/${id}`,null,{
            params : obj
        })
    },
    getNote : async (id) => {
        return await axiosInstance.get(`/note/${id}`)
    }, 
    getNotes : async () => {
        return await axiosInstance.get("/note")
    },
    login : async (userName,password) => {
        return await axiosInstance.post("/api/auth/login",{userName : userName,password : password})
    },
    signUp : async (em,un,pw) => {
        return await axiosInstance.post("/api/auth/signup",{userName : un,email : em, password : pw})
    }, 
    refreshToken : async(refreshToken) => {
        return await axiosInstance.post("/api/auth/refreshToken",{refreshToken})
    }   
}