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
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" 
          @keydown="statusText='正在输入.....'" @input="onUpdateNote" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @keydown="statusText='正在输入.....'"
           @input="onUpdateNote" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import NoteSidebar from './NoteSidebar.vue';
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import{mapGetters,mapActions} from 'vuex'


let md=new MarkdownIt()

export default {
components: {  NoteSidebar },
    name: "NoteDetail",
    data() {
        return {
            statusText:'未更新',
            isShowPreview:false
        };
    },
      computed:{
        ...mapGetters([
            'notes',
            'curNote'
        ]),
          previewContent(){
            return md.render(this.curNote.content||'')
        }, 
     },
    created() {
     this.checkLogin({path:'/login'})
    },
    methods:{
        ...mapActions([
            'updateNote',
            'deleteNote',
            'checkLogin'
        ]),
        onUpdateNote:_.debounce(function(){
           this.updateNote({noteId:this.curNote.id,title:this.curNote.title,content:this.curNote.content
            }).then(res=>{
                this.statusText='已保存'
            }).catch(res=>{
                this.statusText='保存出错'
            })
        },300),
        onDeleteNote(){
            this.deleteNote({noteId:this.curNote.id}).then(res=>{
            this.$router.replace("/note")      
            })
        }
    },
    beforeRouteUpdate(to,from,next){
        this.$store.commit('setCurNote',{curNoteId:to.query.noteId})
        next()

    },
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