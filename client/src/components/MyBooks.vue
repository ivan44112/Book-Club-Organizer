<template>
  <div class="books">
    <div class="title-container">
      <h1 class="title-blue">Currently Reading</h1>
    </div>
    <div class="currently-reading-container">
      <MyBook v-for="book in currentlyReadingBooks" v-bind:key="book.id" :books="book" :club="userClubs" :type="'reading'"/>
    </div>
    <h1 class="books-toread">Books i want to read</h1>
    <div class="books-to-read-container">
      <MyBook v-for="book in wantToReadBooks" v-bind:key="book.id" :books="book" :club="userClubs" :type="'wantToRead'"/>
    </div>
    <h1 class="booksiwant-toread">Favorite Books</h1>
    <div class="favorite-books-container">

    </div>
  </div>
</template>

<script>
import MyBook from "./MyBook";
import axios from "axios";

export default {
  name: "MyBooks",
  data (){
    return{
      wantToReadBooks:{},
      currentlyReadingBooks:{},
      userClubs: {}
    }
  },
  components: {
    MyBook

  },
  methods: {
    async getUserClubs(){
      let user = JSON.parse(localStorage.getItem("user"))
      try{
        let res = await axios.get('http://localhost:5000/clubs/getUserClubs', {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
        this.userClubs = res.data;
      } catch (err){
        console.log(err)
      }
      await this.getWantToReadBooks()
      await this.getCurrentlyReadingBooks()
    },

    getWantToReadBooks(){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: { "Authorization": `Bearer ${user.token}`},
        params: { status: 0 }
      }
      axios
          .get(`http://localhost:5000/books/getUserBooks/${this.userClubs[0].club_id}`, config)
          .then(res => {
            console.log(res.data)
            this.wantToReadBooks = res.data
          })
    },
    getCurrentlyReadingBooks(){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: { "Authorization": `Bearer ${user.token}`},
        params: { status: 1 }
      }
      axios
          .get(`http://localhost:5000/books/getUserBooks/${this.userClubs[0].club_id}`, config)
          .then(res => {
            console.log(res.data)
            this.currentlyReadingBooks = res.data
          })
    }
      },
  mounted() {
    this.getUserClubs()
  }
}
</script>

<style scoped>

.books{
  width: calc(100% - 190px);
}

.title-container {
  width: 100%;
  left: 190px;
  display: flex;
  background-color: #f7f9fd;
}

.title-blue {
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;

}

.books-toread{
  color: #0072D5;
  font: normal normal bold 20px/26px Arial;
  display: flex;
  background-color: #f7f9fd;
  padding-left: 30px;
  padding-top: 30px;

}

.book-toread{
  width: 245px;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
}

.booksiwant-toread{
  color: #0072D5;
  font: normal normal bold 20px/26px Arial;
  display: flex;
  background-color: #f7f9fd;
  padding-left: 30px;
  padding-top: 30px;
}

.bookiwant-toread{
  width: 245px;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
}
.currently-reading-container{
  display: flex;
  flex-wrap: wrap;
}
.books-to-read-container{
  display: flex;
  flex-wrap: wrap;
}
.favorite-books-container{
  display: flex;
  flex-wrap: wrap;
}
</style>