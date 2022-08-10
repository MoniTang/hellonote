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
      let title=window.prompt('请输入笔记名')
      if(title.trim()===''){
        return alert('笔记名不能为空') 
      }
      Notebooks.addNoteBook({title}).then(res=>{
        res.data.friendlyUpdatedAt=friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        alert('创建成功')
      })
    },
     onEdit(item){
      let title=window.prompt('请输入修改后的笔记名',item.title)
      if(title.trim()===''){
        return alert('修改失败，笔记名不能为空') 
      }
      Notebooks.updateNotebook(item.id,{title}
      ).then(res=>{
        item.title=title
        alert('修改成功')
      })
    },
     onDelete(item){
      let isConfirm=window.confirm('你确定删除该笔记',item)
      if(isConfirm){
        Notebooks.deleteNotebook(item.id).then(res=>{
          this.notebooks.splice(this.notebooks.indexOf(item),1);
        alert(res.msg)
        })        
      }
      
    },
    
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list);
</style>