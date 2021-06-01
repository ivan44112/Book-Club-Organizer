<template>
  <div v-if="book" class="book-property">
    <ThePrinceOfThorns v-if="!bookNotInAnyClub && !loading" :book="book" :currentClub="currentClub" :userBookData="userBookData" :currPage="currentPage"/>
    <div v-if="bookNotInAnyClub && !loading" class="book-container">
      <h1>{{book.volumeInfo.title}}</h1>
      <img class="kings-image" :src="book.volumeInfo.imageLinks.thumbnail" :alt="book.volumeInfo.title">
    </div>
    <div class="navigation">
      <div class="dropdown">
        <button class="dropbtn">Actions <img class="arrow" src="../assets/arrow2.png"></button>
        <div class="dropdown-content">
          <a v-on:click="addToWishList">Add to Wishlist</a>
          <a class="suggest-btn" href="#">Suggest Book</a>
          <div class="dropdown-right">
            <a v-on:click="suggestBook(club.club_id)" v-for="club in userClubs" v-bind:key="club.club_id" :value="club.club_id">{{ club.club_name }}</a>
          </div>
          <!-- <a class="remove" href="#">Remove</a> -->
        </div>
      </div>
    </div>
    <div v-if="!bookNotInAnyClub && !loading" class="dropdown-after">
      <input  class="number" type="number" v-model="currentPage" :max="book.volumeInfo.pageCount" :min="0" />
      <button v-bind:class="{ disabledButton: currentPage.toString() === userBookData[0].current_page.toString() }" class="update" type="submit" value="update" v-on:click="updateCurrentPage">Update Page</button>
      <!--
      <span class="last-update">Last update: 3 days ago</span>
      -->
    </div>
    <h1 class="about">About the book</h1>
    <div v-if="!loading" class="about-content">
      <p class="release">Release Date: <span class="date">{{book.volumeInfo.publishedDate}}</span> </p>
      <p class="categories">Categories: <span v-if="book.volumeInfo.categories" class="category-count">{{book.volumeInfo.categories[0]}}</span> </p>
      <p class="publisher">Publisher: <span class="publisher-name">{{book.volumeInfo.publisher}}</span> </p>
    </div>
    <div class="above-summary">
    </div>
    <h2 class="summary">Summary</h2>
    <div class="summary-content">
      <p>{{bookDescription}}</p>
    </div>
    <div v-if="!bookNotInAnyClub">
      <h1 class="discussion-title">Discussion</h1>
      <BookComment :currentClub="currentClub"/>
    </div>
  </div>
</template>

<script>
import ThePrinceOfThorns from "@/components/ThePrinceOfThorns";
import axios from "axios";
import BookComment from "./BookComment";

export default {
  name: "BookProperty",
  components: {
    BookComment,
    ThePrinceOfThorns,
  },
  data() {
    return {
      book: {},
      bookDescription: "",
      loading: true,
      userClubs:[],
      currentClub:{},
      userBookData:{},
      pageNumberChanged: false,
      currentPage : 0,
      user:{},
      isAdmin: false,
      bookNotInAnyClub: true
    }
  },
  methods:{
    getBookData(){
      axios
          .get(`https://www.googleapis.com/books/v1/volumes/${this.$route.params.id}`)
          .then(response => {
            this.book = response.data;
            //remove unwanted tags from book description response
            this.bookDescription = response.data.volumeInfo.description.replace(/(<([^>]+)>)/gi, "");
            this.loading = false;
          })
    },
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
      await this.getUserBookData();
    },

    async suggestBook(clubId){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      };
      let body = {
        "book_id":this.$route.params.id
      }
      try{
        let res = await axios.post(`http://localhost:5000/bookSuggestions/addBook/${clubId}`,body,config)
        if(res.data){
          alert("you successfully suggested this book")
        }
      } catch (err){
        alert("you already suggested a book")
      }
    },

    async addToWishList(){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      };
      let body = {
        "book_id":this.book.id
      }
      try{
        let res = await axios.post(`http://localhost:5000/books/addUserBookNoClub`,body,config)
        if(res.data){
          alert("you successfully added this book to your Wishlist")
        }
      } catch (err){
        alert("you already added this book")
      }
    },

    async getUserBookData(){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
        params: {book_id: this.$route.params.id}
      }
      axios
          .get(`http://localhost:5000/books/getUserBook`, config)
          .then(res => {
              this.userBookData = res.data
              this.currentPage = res.data[0].current_page
              this.currentClub = this.userClubs.filter( club => club.club_id === this.userBookData[0].club_id)
              this.bookNotInAnyClub = false
          })
    },

    updateCurrentPage(){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
      }
      let body = {
        "book_id":this.$route.params.id,
        "current_page":this.currentPage
      }
      axios
          .patch(`http://localhost:5000/books/pageNumber/${this.currentClub[0].club_id}`,body,config)
          .then(res => {
            console.log(res.data)
            this.userBookData[0].current_page = this.currentPage
          })
          .catch( e => {
            console.log(e.response.data)
              }
          )
    },

    async getUser(){
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

    async checkIfAdmin(){
      if(this.currentClub.admin === this.user.user_id){
        this.isAdmin = true
      }
    },

  },
   mounted() {
    this.getBookData();
    this.getUserClubs();
    this.getUser();
    this.checkIfAdmin();
  }
}
</script>

<style scoped>
.book-property {
  width: calc(100% - 190px);
}

.navigation {
  display: flex;
  padding-top: 20px;
  padding-left: 30px;
}

.dropbtn {
  background-color: white;
  color: #0072D5;
  padding: 10px;
  font: normal normal bold 16px Arial;
  cursor: pointer;
  border: 1px solid;
  outline: none;
  border-radius: 5px;
}

.dropdown {
  position: relative;
  display: inline-block;
  padding: 5px 10px 5px 0;
}

.dropdown-right{
  position: absolute;
  left:160px;
  top: 50px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  background: white;
  flex-direction: column;
  white-space:nowrap;
  visibility: hidden;
}
.dropdown-right:hover{
  visibility: visible;
}

.suggest-btn:hover + .dropdown-right{
  visibility: visible;
}
.dropdown-right a{
  cursor: pointer;
  min-width:120px;
}

.arrow {
  padding-left: 40px;
  width: 20px;

}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font: normal normal bold 16px Arial;
}

.dropdown-content a {
  color: #0072D5;
  padding: 16px 14px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content a.remove {
  color: #ff0000;
}

.dropdown-content a:hover {
  background-color: #f1f1f1
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-after {
  display: flex;
  padding-left: 30px;
  padding-top: 30px;
}

.number {
  width: 120px;
  color: #0072D5;
  border:none;
  border-bottom: 3px solid #0072D5;
  font: normal normal bold 26px/30px Arial;
  outline:none;
  text-align: center;
}

.update {
  border: none;
  width: 130px;
  height: 35px;
  background: #0072D5;
  border-radius: 6px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  margin-left: 30px;
}

.update:hover{
  opacity: 0.8;
}
.update:active{
  opacity: 1;
}

.last-update {
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  padding-left: 30px;
  padding-top: 18px;
}

.about {
  padding-top: 33px;
  display: flex;
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;
  width: 100%;
  left: 190px;
  background-color: #f7f9fd;
}

.about-content{
  padding-left: 30px;
}

.release{
  display: flex;
  font: normal normal bold 15px/25px Arial;
  color: #727272;
}
.date{
  padding-left: 5px;
  font: normal normal bold 15px/25px Arial;
  color: #343131;
}
.categories{
  display: flex;
  font: normal normal bold 15px/25px Arial;
  color: #727272;
}
.category-count{
  padding-left: 5px;
  font: normal normal bold 15px/25px Arial;
  color: #343131;
}

.publisher{
  display: flex;
  font: normal normal bold 15px/25px Arial;
  color: #727272;
}

.publisher-name{
  padding-left: 5px;
  font: normal normal bold 15px/25px Arial;
  color: #343131;
}

.above-summary{
  border-bottom: 1px solid #a4a2a2;
  width: calc(100% - 190px);
}

.summary{
  display: flex;
  padding-left: 30px;
  color: #727272;
}

.summary-content{
  padding-left: 30px;
  text-align: justify;
  word-break: break-all;
  width: calc(100% - 190px);
  font: normal normal  15px/22px Arial;

}
.discussion-title{
  padding-top: 33px;
  display: flex;
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;
  width: 100%;
  left: 190px;
  background-color: #f7f9fd;
}

.disabledButton{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
.book-container{
  display: flex;
  flex-direction: column;
}
.book-container img{
  width:250px;
  margin:0 30px 10px 30px;
}
.book-container h1{
  align-self: flex-start;
  margin-left: 30px;
}
</style>

