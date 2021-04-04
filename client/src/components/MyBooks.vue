<template>
  <div class="books">
    <div class="title-container">
      <h1 class="title-blue">Currently Reading</h1>
    </div>
    <div class="currently-reading-container">
      <MyBook/>
      <MyBook/>
      <MyBook/>
      <MyBook/>
      <MyBook/>
    </div>
    <h1 class="books-toread">Books i want to read</h1>
    <div class="books-to-read-container">
      <img class="book-toread" src="../assets/book3.png">
    </div>
    <h1 class="booksiwant-toread">Favorite Books</h1>
    <div class="favorite-books-container">
      <img class="bookiwant-toread" src="../assets/book4.png">
    </div>
  </div>
</template>

<script>
import MyBook from "./MyBook";
export default {
  name: "MyBooks",
  components: {
    MyBook

  },
  methods: {

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