<template>
  <div class="book-property">
    <ThePrinceOfThorns v-if="loadState === 'success'" :book="book"/>
    <div class="navigation">
      <div class="dropdown">
        <button class="dropbtn">Actions <img class="arrow" src="../assets/arrow2.png"></button>
        <div class="dropdown-content">
          <a href="#">Mark as Read</a>
          <a href="#">Add to Favorites</a>
          <a href="#">Add to Wishlist</a>
          <a class="suggest-btn" href="#">Suggest Book</a>
          <div class="dropdown-right">
            <a href="#">The Flying Readers</a>
            <a href="#">Dark Fantasy</a>
          </div>
          <!-- <a class="remove" href="#">Remove</a> -->
        </div>
      </div>
    </div>
    <div class="dropdown-after">
      <input class="number" type="number" value="236"/>
      <button class="update" type="submit" value="update">Update Page</button>
      <span class="last-update">Last update: 3 days ago</span>
    </div>
    <h1 class="about">About the book</h1>
    <div v-if="loadState === 'success'" class="about-content">
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
    <h1 class="discussion-title">Discussion</h1>
    <BookComment/>
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
      loadState: ''
    }
  },
  methods:{
    getBookData(){
      this.loadState = 'loading';
      axios
          .get(`https://www.googleapis.com/books/v1/volumes/${this.$route.params.id}`)
          .then(response => {
            this.book = response.data;
            this.loadState = 'success';
            //remove unwanted tags from book description response
            this.bookDescription = response.data.volumeInfo.description.replace(/(<([^>]+)>)/gi, "");
          })
    }
  },
   mounted() {
    this.getBookData()
  }
}
</script>

<style scoped>
.book-property {
  width: calc(100% - 190px);
}

.navigation {
  display: flex;
  padding-top: 10px;
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

}
.dropdown-right{
  position: absolute;
  left:160px;
  top:125px;
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
  padding:5px;
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
  padding: 12px 16px;
  text-decoration: none;
  display: block;
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
</style>

