<template>
    <div class="note-sidebar">
    <el-dropdown  class="notebook-title" @command="handleCommand" placement="bottom">
        <span class="el-dropdown-link">
        {{curBook.title}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
                <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
    </el-dropdown>
    <span class=" btn add-note" @click="onAddNote">添加笔记</span>
     <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes"  :key="note.id"> 
        <router-link :to="`note?notebookId=${curBook.id}&noteId=${note.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>   
        </router-link>       
      </li>
    </ul>

    </div>
</template>
<script>
import{mapGetters,mapActions} from 'vuex'

export default{
    
    name:'NoteSidebar',
    data(){
        return {
        }
    },
    computed:{
        ...mapGetters([
            'notebooks',
            'notes',
            'curBook',
            'curNote',
        ])
    },
    created(){
        this.getNotebooks().then(()=>{
            this.$store.commit('setCurBook',{curBookId:this.$route.query.notebookId})
            return this.getNotes({notebookId:this.curBook.id})
        }).then(()=>{
            this.$store.commit('setCurNote',{curNoteId:this.$route.query.noteId})
                this.$router.replace({
                path:'/note',
                query:{
                    noteId:this.curNote.id,
                    notebookId:this.curBook.id
                }
            })
        })
        // Notebooks.getAll().then(res=>{
        // this.notebooks=res.data
        // this.curBook=this.notebooks.find(
        // notebook => notebook.id==this.$route.query.notebookId)||this.notebooks[0]||{};
        // return Notes.getAll({notebookId:this.curBook.id})
        // }).then(res=>{
        //     this.notes=res.data
        //     this.$emit('update:notes',this.notes)
        //     Bus.$emit('update:notes',this.notes)
            
        // })
    },

    methods:{
       
       ...mapActions([
            'getNotebooks',
            'getNotes',
            'addNote',
        ]),

        handleCommand(notebookId){
            if(notebookId=='trash'){
                return this.$router.push({path:'/trash'})
            }
            this.$store.commit('setCurBook',{curBookId:notebookId})
            this.getNotes({notebookId}).then(()=>{
                this.$store.commit('setCurNote',{})
                this.$router.replace({
                path:'/note',
                query:{
                    noteId:this.curNote.id,
                    notebookId:this.curBook.id
                }
            })
        })
            
            

            // Notes.getAll({notebookId}).then(res=>{
            //         this.notes=res.data
            //     })
        },
        onAddNote(){
            this.addNote({notebookId:this.curBook.id}).then(()=>{
                this.$store.commit('setCurNote',{})
                this.$router.replace({
                path:'/note',
                query:{
                    noteId:this.curNote.id,
                    notebookId:this.curBook.id
                }
            })
        })

            // Notes.addNote({notebookId:this.curBook.id})
            // .then(res=>{
            //     this.notes.unshift(res.data)
            // })
        }

    }
}
</script>
<style lang="less" scoped>

@import url(../assets/css/note-sidebar.less);
</style>