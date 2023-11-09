import storage from '@react-native-async-storage/async-storage'
import axios from 'axios'
const BASE_URL = "http://192.168.31.23:9192"
const axiosInstance = axios.create({baseURL : BASE_URL})
export const api = {
    add : async (note) => {
        try{
            await storage.setItem(note.id,JSON.stringify(note))
        }catch(e){
            
        }
    },
    delete : async (id) => {
        try{
            await storage.removeItem(id)
        }catch(e){}
    },
    update : async (id,tempNote) => {
        try{
            await storage.mergeItem(id,JSON.stringify(tempNote))
        }catch(e){}
    },
    getNote : async (id) => {
        try{
            const note = await storage.getItem(id)
            return JSON.parse(note)
        }catch(e){}
    }, 
    getNotes : async () => {
        try{
            const keys = (await storage.getAllKeys()).filter(key => key!=='EXPO_CONSTANTS_INSTALLATION_ID');
            const result = await storage.multiGet(keys)
            return result.map(res => JSON.parse(res[1]))
        }catch(e) {}
    },
    login : async (userName,password) => {
        return await axiosInstance.post("/api/v1/login",{userName : userName,password : password})
    },
    signUp : async (em,un,pw) => {
        return await axiosInstance.post("/api/v1/signup",{email : em,userName : un, password : pw})
    },
    
}