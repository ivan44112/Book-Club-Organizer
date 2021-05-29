<template>
  <router-link :to="{ name: 'book', params: {id: books.book_id} }" :key="$route.path">
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
      </div>
    </div>
  </router-link>
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

</style>