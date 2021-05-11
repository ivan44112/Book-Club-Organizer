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
    <button>Vote</button>
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
    }
  },
  props: {
    book: {
      type: Object
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
  }
  .voting-book-container img{
    width: 200px;
  }
  .voting-book-container button{
    width: 100px;
    align-self: center;
    margin-top: 5px;
    border: none;
    height: 30px;
    background: #0072D5;
    border-radius: 4px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    font-weight: bold;
  }
</style>