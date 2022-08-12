import request from '@/helpers/request'
import { friendlyDate } from '../helpers/until'
const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET).then(res => {
                res.data = res.data.sort((item1, item2) => item1.updatedAt < item2.updatedAt ? 1 : -1)
                res.data.forEach(item => {
                    item.friendlyUpdatedAt = friendlyDate(item.updatedAt)
                });
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateNotebook(notebookId, { title = '' } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
    },
    deleteNotebook(notebookId) {
        return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
    },
    addNoteBook({ title = '' } = { title: '' }) {
        return request(URL.ADD, 'POST', { title })
    }
}