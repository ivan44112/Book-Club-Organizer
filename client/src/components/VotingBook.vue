<template>
  <div v-if="!loading" class="voting-book-container">
    <template v-if="bookData.volumeInfo.imageLinks">
      <img class="kings-image" :src="bookData.volumeInfo.imageLinks.thumbnail" :alt="bookData.volumeInfo.title">
    </template>
    <template v-else>
      <img
          src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
          :alt="bookData.volumeInfo.title"
          width="128"
      >
    </template>
    <p>{{bookData.volumeInfo.title}}</p>
    <p v-if="userIsAdmin" class="votes-count">{{votes}} votes</p>
    <button v-if="!userIsAdmin" v-on:click="vote">Vote</button>
    <button v-if="userIsAdmin" v-on:click="addAsNextBookAdmin">Set as next read</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VotingBook",
  data(){
    return{
      bookData:[],
      loading: true,
      voted:false,
      bookSetAsNext:false
    }
  },
  props: {
    book: {
      type: Object
    },
    userIsAdmin: {
      type: Boolean
    },
    votes: {
      type: Number
    },
    currentClub: {
      type: Object
    },
    toggleVotingPhase: {
      type: Function
    },
  },
  methods:{
    async getBookData(){
      await axios
          .get(`https://www.googleapis.com/books/v1/volumes/${this.book.book_id}`)
          .then(response => {
            this.bookData = response.data
            this.loading = false
          })
    },
    async vote(){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      };
      let body = {
        "book_id":this.book.book_id
      }
      try{
        let res = await axios.post(`http://localhost:5000/bookSuggestions/addVote/${this.$route.params.id}`,body,config)
        if(res.data){
          console.log(res.data)
          this.$router.go()
        }
      } catch (err){
        alert("You already voted")
      }
    },
    addAsNextBookAdmin(){
      let body = {
        "book_id":this.book.book_id
      }
      axios
          .post(`http://localhost:5000/books/addUserBook/${this.currentClub.club_id}`,body)
          .then(res => {
            if(res.data){
              this.toggleVotingPhase();
              this.bookSetAsNext = true;
              this.$router.go()
            }
          })
    }
  },
  mounted() {
    this.getBookData()
  }
}
</script>

<style scoped>
  .voting-book-container{
    display: flex;
    flex-direction: column;
    padding: 15px;
    align-items: center;
  }
  .voting-book-container img{
    width: 200px;
  }
  .voting-book-container button{
    width: 130px;
    align-self: center;
    margin-top: 5px;
    border: none;
    height: 36px;
    background: #0072D5;
    border-radius: 4px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    font-weight: bold;
  }
  .voting-book-container button:hover{
    background: #1891ff;
  }
  .votes-count{
    font-weight: bold;
    margin:0 0 7px 0;
  }
</style>