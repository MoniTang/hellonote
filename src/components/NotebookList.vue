<template>
  <div class="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="item in notebooks" :key="item.id" :to="`/note?notebookId=${item.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{item.title}}
              <span >{{item.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(item)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
              <span class="date">{{item.updatedAtFriendly}}</span>
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

import {mapState,mapActions,mapGetters} from 'vuex'

export default {
  name: 'NotebookList',
  data () {
    return {}
  },
  created(){
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/Login'})

      }
    }),
    this.$store.dispatch('getNotebooks')

    // Notebooks.getAll().then(res=>{
    //   this.notebooks=res.data;
    // })
  },
 computed: {
    ...mapGetters(['notebooks'])
  },

  methods:{
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook'
    ]),

    onCreate(){
      this.$prompt('请输入笔记本的标题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^.{1,30}$/,
          inputErrorMessage:'笔记本的名字不能为空且不超过30个字符'
        }).then(({ value }) => {
          this.addNotebook({title:value})
        })
    },
     onEdit(item){
      let title=''
       this.$prompt('修改笔记本标题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:item.title,
          inputPattern:/^.{1,30}$/,
          inputErrorMessage:'笔记本的名字不能为空且不超过30个字符'
        }).then(({ value }) => {
          this.updateNotebook({notebookId:item.id,title:value})
        })
    },
     onDelete(item){
       this.$confirm('确认要删除笔记本吗?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNotebook({notebookId:item.id})
        }) 
    },
    
  }
}
</script>
<style lang="less" scoped>
@import url(../assets/css/notebook-list);
</style>