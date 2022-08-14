<template>
<div class="note">
  <NoteSidebar  @update:notes="val=>notes=val"></NoteSidebar>
    <div class="note-detail">
    <div class="note-empty" v-show="!curNote.id">请选择一个笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期:{{curNote.createdAtFriendly}}</span>
          <span> 更新日期:{{curNote.updatedAtFriendly}}</span>
          
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" 
          @keydown="statusText='正在输入.....'" @input="updateNote" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @keydown="statusText='正在输入.....'"
           @input="updateNote" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus';
import NoteSidebar from './NoteSidebar.vue';
import _ from 'lodash'
import Notes from '../apis/notes';
import MarkdownIt from 'markdown-it'

let md=new MarkdownIt()

export default {
components: {  NoteSidebar },
    name: "NoteDetail",
    data() {
        return {
            curNote:[],
            notes:[],
            statusText:'未更新',
            isShowPreview:false
        };
    },
    created() {
        Auth.getInfo().then(res => {
            if (!res.isLogin) {
                this.$router.push({ path: "/Login" });
            }
        });
        Bus.$once('update:notes',val=>{
            this.curNote=val.find(note=>note.id==this.$route.query.noteId)||{}
        })
    },
    beforeRouteUpdate(to,from,next){
        this.curNote=this.notes.find(note=>note.id==to.query.noteId)
        next()

    },
    computed:{
        previewContent(){
            return md.render(this.curNote.content||'')
        }
    },
    methods:{
        updateNote:_.debounce(function(){
            Notes.updateNote({noteId:this.curNote.id},
            {title:this.curNote.title,content:this.curNote.content
            }).then(res=>{

                this.statusText='已保存'

            }).catch(res=>{
                console.log(curNote);
                this.statusText='保存出错'

            })
        },300),
        deleteNote(){
            Notes.deleteNote({noteId:this.curNote.id}).then(res=>{
                this.$message.success(res.msg)
                this.notes.splice(this.notes.indexOf(this.curNote),1)
                this.$router.replace("/note")      
            })
        }
    }
}
</script>

<style  lang="less" scoped>
@import url(../assets/css/note-detail.less);

.note{
  display: flex;
  background: #fff;
  flex:1;
  align-items: stretch;
}
</style>