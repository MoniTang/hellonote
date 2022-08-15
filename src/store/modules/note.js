import Note from '@/apis/notes'
import { Message } from 'element-ui'

const state = {
    notes: [],
    curNote: [],
}
const getters = {
    notes: state => state.notes
}
const mutations = {
    setNote(state, payload) {
        state.notes = payload.notes
    },
    addNote(state, payload) {
        state.notes.unshift(payload.note)
    },
    updateNote(state, payload) {
        let note = state.notes.find(note => note.id === payload.noteId) || {}
        note.title = payload.title
    },
    deleteNote(state, payload) {
        state.notes = state.notes.filter(note => note.id !== payload.noteId)
    }

}
const actions = {
    getNotes({ commit }, { notebookId }) {
        return Note.getAll({ notebookId }).then(res => {
            commit('setNote', { notes: res.data })
        })
    },
    addNote({ commit }, { notebookId, title, content }) {
        return Note.addNote({ notebookId }, { title, content })
            .then(res => {
                console.log('add success...', res)
                commit('addNote', { note: res.data })
            })
    },
    updateNote({ commit }, { noteId, title, content }) {
        return Note.updateNote({ noteId }, { title, content })
            .then(res => {
                commit('updateNote', { note: res.data })
                Message.success(res.msg)

            })
    },
    deleteNote({ commit }, { noteId }) {
        return Note.deleteNote(noteId).then(res => {
            commit('deleteNote', { noteId })
            Message.success(res.msg)
        })
    }


}
export default {
    state,
    getters,
    mutations,
    actions
}