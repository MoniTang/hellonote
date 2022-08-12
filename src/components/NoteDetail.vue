<template>
<div class="note">
  <NoteSidebar></NoteSidebar>
    <!-- <div class="note-detail">
    <div class="note-empty">请选择笔记</div>
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 创建日期:</span>
          <span> 更新日期:</span>
          <span>111</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="!isShowPreview">
          </div>
        </div>
      </div>
    </div> -->
</div>


</template>

<script>
import Auth from '@/apis/auth'
import Avatar from './Avatar.vue';
import NoteSidebar from './NoteSidebar.vue';

export default {
    name: "NoteDetail",
    data() {
        return {
            msg: "笔记详情页",
        };
    },
    created() {
        Auth.getInfo().then(res => {
            if (!res.isLogin) {
                this.$router.push({ path: "/Login" });
            }
        });
    },
    components: { Avatar, NoteSidebar }
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