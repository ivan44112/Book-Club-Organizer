<template>
  <div class="comment" v-if="comment">
    <p v-if="userName" class="comment-author">{{userName}}:</p>
    <p class="comment-text">{{comment}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "Comment",
  data(){
    return{
      userName:""
    }
  },
  props:{
    comment:{
      type:String
    },
    userId:{
      type:String
    }
  },
  methods:{
    getUserName(){
      axios
          .get(`/auth/currentUserById/${this.userId}`)
          .then(response => {
            this.userName = response.data.name;
          })
    }
  },
  mounted() {
  this.getUserName()
  }
}
</script>

<style scoped>
.comment-text{
  margin: 10px 0;
}
.comment{
  text-align: left;
  background: #F8F8F8;
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
}
.comment-author{
  font-weight: bold;
  margin: 10px 0;
}
</style>