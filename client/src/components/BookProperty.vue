<template>
  <div class="book-property">
    <ThePrinceOfThorns/>
    <div class="navigation">
      <div class="dropdown">
        <button class="dropbtn">Actions <img class="arrow" src="../assets/arrow2.png"></button>
        <div class="dropdown-content">
          <a href="#">Mark as read</a>
          <a href="#">Add to favorites</a>
          <a href="#">Submit</a>
          <a class="remove" href="#">Remove</a>
        </div>
      </div>
    </div>
    <div class="dropdown-after">
      <div class="number">238</div>
      <button class="update" type="submit" value="update">Update Page</button>
      <span class="last-update">Last update: 3 days ago</span>
    </div>
    <h1 class="about">About the book</h1>
    <div class="about-content">
      <p class="release">Release Date: <span class="date">17.03.2015.</span> </p>
      <p class="categories">Categories: <span class="category-count">Dark Fantasy, Science Fiction, Fantasy</span> </p>
      <p class="publisher">Publisher: <span class="publisher-name">Lorem Ipsum Publish</span> </p>
    </div>
    <div class="above-summary">
    </div>
    <h2 class="summary">Summary</h2>
    <div class="summary-content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus laoreet laoreet. Pellentesque consequat sagittis nibh, et varius risus fermentum at. Vestibulum non libero justo. Donec porta rutrum est eleifend tempus. Morbi pellentesque, orci quis tempus commodo, libero lorem ultrices velit, non sollicitudin nisl ex et metus. Nulla ut mollis nisi. Praesent massa nisl, ultrices non dapibus et, imperdiet sit amet erat. Fusce convallis vehicula dapibus.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus laoreet laoreet. Pellentesque consequat sagittis nibh, et varius risus fermentum at. Vestibulum non libero justo. Donec porta rutrum est eleifend tempus. Morbi pellentesque, orci quis tempus commodo, libero lorem ultrices velit, non sollicitudin nisl ex et metus. Nulla ut mollis nisi. Praesent massa nisl, ultrices non dapibus et, imperdiet sit amet erat. Fusce convallis vehicula dapibus.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus laoreet laoreet. Pellentesque consequat sagittis nibh, et varius risus fermentum at. Vestibulum non libero justo. Donec porta rutrum est eleifend tempus. Morbi pellentesque, orci quis tempus commodo, libero lorem ultrices velit, non sollicitudin nisl ex et metus. Nulla ut mollis nisi. Praesent massa nisl, ultrices non dapibus et, imperdiet sit amet erat. Fusce convallis vehicula dapibus.</p>
    </div>
    <div class="discussion">
      Discussion
    </div>
  </div>
</template>

<script>
import ThePrinceOfThorns from "@/components/ThePrinceOfThorns";
import axios from "axios";

export default {
  name: "BookProperty",
  components: {
    ThePrinceOfThorns,
  },
  data() {
    return {
      book: {},
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
  padding: 16px;
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
  width: 150px;
  color: #0072D5;
  border-bottom: 3px solid #0072D5;
  font: normal normal bold 26px/30px Arial
}

.update {
  border: none;
  width: 138px;
  height: 35px;
  background: #0072D5;
  border-radius: 6px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  margin-left: 50px;
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

.discussion{
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

