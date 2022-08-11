<template>
  <div class="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表{{notebooks.length}}</h3>
        <div class="book-list">
          <router-link v-for="item in notebooks" :key="item.id" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{item.title}}
              <span >{{item.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(item)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
              <span class="date">{{item.friendlyUpdatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import { friendlyDate } from '@/helpers/until'

export default {
  name: 'NotebookList',
  data () {
    return {
      notebooks:[],
    }
  },
  created(){
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/Login'})

      }
    }),
    Notebooks.getAll().then(res=>{
      this.notebooks=res.data;
    })
  },
  methods:{
    onCreate(){
      this.$prompt('请输入笔记本的名字', '创建新的笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^.{1,30}$/,
          inputErrorMessage:'笔记本的名字不能为空且不超过30个字符'
        }).then(({ value }) => {
         return Notebooks.addNoteBook({title:value})
        }).then(res=>{
          res.data.friendlyUpdatedAt=friendlyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          this.$message.success(res.msg)      
        })
    },
     onEdit(item){
      let title=''
       this.$prompt('请输入笔记本的名字', '修改笔记本名字', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:item.title,
          inputPattern:/^.{1,30}$/,
          inputErrorMessage:'笔记本的名字不能为空且不超过30个字符'
        }).then(({ value }) => {
          title = value
          return Notebooks.updateNotebook(item.id,{title})
        }).then(res=>{
          item.title=title
          this.$message.success(res.msg)      
      })
    },
     onDelete(item){
       this.$confirm('确认要删除笔记本吗?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return Notebooks.deleteNotebook(item.id)
        }).then(res=>{
        this.notebooks.splice(this.notebooks.indexOf(item),1);
        this.$message.success(res.msg) 
        })     
    },
    
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list);
</style>