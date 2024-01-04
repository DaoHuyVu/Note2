import { api } from "../api/noteApi"

class NoteRepository {
    notes = null
    static instance = null
    static getInstance() {
        if(NoteRepository.instance == null)
            NoteRepository.instance = new NoteRepository()
        return NoteRepository.instance
    }
    async getNotes() {
        try{
            if(this.notes === null){
                const response = await api.getNotes()
                this.notes = response.data
            }
            return this.notes
        }
        catch(error){
            throw new Error(error)
        }
    }
    getNote(id) {
        return this.notes.find(note => note.id === id)
    }
    async addNote(note){
        try{
            const response = await api.add(note)
            this.notes.push(response.data)
            return this.notes
        }catch(error){
            throw new Error(error)
        }
    }
    async updateNote(id,obj) {
        try{
            const response = await api.update(id,obj)
            this.notes = this.notes.map(note => note.id === id ? response.data : note)
        }catch(error){
            throw new Error(error)
        }
    }
    async deleteNote(id){
        try{
            const response = await api.delete(id)
            this.notes = this.notes.filter(note => note.id !== id)
            return response.data
        }catch(error){
            throw new Error(error)
        }
    }
}
export default NoteRepository.getInstance()
