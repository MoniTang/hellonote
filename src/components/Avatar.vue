<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    created(){
     this.setUser()
    },
    methods: {
      ...mapActions({
        'setUser': 'checkLogin'
      })
    },
    computed: {
      ...mapGetters([
        'username',
        'slug'
        ]),
    }
  }
</script>

<style scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  color: #fff;
  text-shadow: 1px 0 1px #c5c3bd;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>