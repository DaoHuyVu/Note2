import axios from 'axios'
import  * as SecureStore from 'expo-secure-store'
import * as RootNavigation from "../RootNavigation.js"
const BASE_URL = "https://terrier-modern-violently.ngrok-free.app"
const axiosInstance = axios.create({baseURL : BASE_URL})
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('accessToken')
        if(
            !config.url.includes("/api/auth/login") &&
            !config.url.includes("/api/auth/signup") &&
            !config.url.includes("/api/auth/refreshToken") 
        ){
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
            if(error.response.status === 401){
                if(
                    error.response.headers['x-auth-status'] === 'Expired' && 
                    originalConfig.url.includes("/api/auth/refreshToken") 
                ){
                    await SecureStore.deleteItemAsync('accessToken')
                    await SecureStore.deleteItemAsync('refreshToken')
                    RootNavigation.logout()
                }
                else{
                    try{
                        const refreshToken = await SecureStore.getItemAsync('refreshToken')
                        const response = await api.refreshToken(refreshToken)
                        await SecureStore.setItemAsync('accessToken',response.data.accessToken)
                        await SecureStore.setItemAsync('refreshToken',response.data.refreshToken)
                        return axiosInstance(originalConfig)
                    }catch(_error){
                        return Promise.reject(_error);
                    }
                }
            }
            else{
                return Promise.reject(error)
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
        return await axiosInstance.post("/api/auth/refreshToken",null,{params : {refreshToken}})
    },
    logout : async(accessToken,refreshToken) => {
        return await axiosInstance.post("/api/auth/logout",null,{
            params : {
                accessToken,refreshToken
            }
        })
    }
}