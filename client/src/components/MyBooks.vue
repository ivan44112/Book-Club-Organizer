<template>
  <div class="books">
    <div class="title-container">
      <h1 class="title-blue">Currently Reading</h1>
    </div>
    <div class="book-container">
      <div class="book-progress">
        <img class="book1" @click="Redirect" src="../assets/book2.png">
        <div class="book1-percent">
          <span class="book1-count">37%</span>

        </div>
      </div>
      <div class="book-progress2">
        <img class="book2" @click="Redirect" src="../assets/book1.png">
        <div class="book2-percent">
          <span class="book2-count">54%</span>

        </div>
      </div>
    </div>
    <h1 class="books-toread">Books i want to read</h1>
    <img class="book-toread" src="../assets/book3.png">
    <h1 class="booksiwant-toread">Books i want to read</h1>
    <img class="bookiwant-toread" src="../assets/book4.png">
  </div>
</template>

<script>
export default {
  name: "MyBooks",
  components: {

  },
  methods:
      {
        Redirect()
        {
          this.$router.push('bookproperty');
        }
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

.book-container{
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;

}
.book1{
  cursor: pointer;
}
.book2{
  cursor: pointer;
  padding-left: 50px;
}

.book1-percent {
  margin-top: 10px;
  border: 1px solid #0072D5;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;
  border-left: #0072D5;
}

.book2-percent {
  margin-top: 10px;
  border: 1px solid #0072D5;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;
  border-left: #0072D5;
  margin-left: 50px;

}


.book1-count {
  width: 37%;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #0072D5;
  text-align: center;
  border-radius: 8px;
  color: white;
}

.book2-count {
  width: 54%;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #0072D5;
  text-align: center;
  border-radius: 8px;
  color: white;
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
</style>