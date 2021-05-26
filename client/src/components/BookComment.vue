<template>
  <div class="comments-container">
    <Comment v-for="comment in comments" :key="comment.created_at" :comment="comment.comment" :userId="comment.user_id"/>
    <div class="new-comment">
      <form>
        <p class="comment-author">{{user.name}}:</p>
        <textarea required class="new-comment-textarea" id="comment" name="comment" v-model="text"/>
        <input class="submit-comment-button" type="submit" value="Add Comment" v-on:click="postComment">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comment from "./Comment";

export default {
name: "BookComment",
  components: {Comment},
  data(){
    return{
      user: {},
      clubBookData:{},
      text: "",
      comments:{}
    }
  },
  props: {
    currentClub:{
      type: Array
    },
  },
  methods: {
    async getCurrentClubBookData() {
      axios
          .get(`http://localhost:5000/clubBooks/getClubBookStatus/${this.currentClub[0].club_id}`,
              {params: {status: true}})
          .then(res => {
            this.clubBookData = res.data[0];
            this.getComments();
          })
    },
    async getCurrentUser(){
      let user = JSON.parse(localStorage.getItem("user"))
      try{
        let res = await axios.get('http://localhost:5000/auth/currentUser', {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
        this.user = res.data;
      } catch (err){
        console.log(err)
      }
    },
    async postComment(e){
      e.preventDefault()
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      };
      let body = {
        "comment":this.text
      }
      try{
        let res = await axios.post(`http://localhost:5000/clubBooks/addComment/${this.clubBookData.club_books_id}`,body,config)
        if(res.data){
          this.text = ""
          await this.getComments()
        }
      } catch (err){
        alert("Comment Error")
      }
    },
    async getComments(){
      try{
        let res = await axios.get(`http://localhost:5000/clubBooks/getComment/${this.clubBookData.club_books_id}`)
        if(res.data){
          this.comments = res.data
        }
      } catch (err){
        alert("Error")
      }
    }
  },
  mounted() {
  this.getCurrentUser()
  this.getCurrentClubBookData()
  }
}
</script>

<style scoped>
.comments-container{
  padding: 20px 30px;
  margin-bottom: 70px;
  width: calc(100% - 190px);
  flex-direction: column;
  display: flex;
}

.comment-author{
  font-weight: bold;
  margin: 10px 0;
}

.new-comment{
  padding: 0 10px;
}
.new-comment form{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.submit-comment-button{
  margin-top:10px;
  border: none;
  width: 120px;
  height: 33px;
  background: #0072D5;
  border-radius: 3px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}
.new-comment-textarea{
  color: #434343;
  outline:0;
  height: 70px;
  border-radius: 5px;
  resize: none;
  border-color:#cccccc;
  width: 100%;
}
</style>