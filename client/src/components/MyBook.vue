<template>
  <div v-if="!loading" class="book-container">
    <div class="book-progress">
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
      <div v-if="type === 'reading'" class="book-percent">
        <span class="book-count">37%</span>
      </div>
      <span>{{club.club_name}}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyBook",
  data(){
    return{
      bookData:{},
      loading:true
    }
  },
  props: {
    type:{
      type: String
    },
    club: {
      type: Array
    },
    books:{
      type: Object
    }
  },
  methods:{
    getBookData(){
      axios
          .get(`https://www.googleapis.com/books/v1/volumes/${this.books.book_id}`)
          .then(response => {
            this.bookData = response.data;
            console.log(this.bookData)
            this.loading = false;
          })
    },
  },
  mounted() {
    this.getBookData()
  }
}
</script>

<style scoped>
.book-container{
  padding-top: 25px;
  padding-left: 30px;
}

.book-percent {
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

.book-count {
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
</style>