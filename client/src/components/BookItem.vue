<template>
  <router-link v-bind:to="{ name: 'book', params: {id: book.id}}" :key="$route.path">
    <div class="book-item">
      <div >
        <template v-if="volumeInfo.imageLinks">
          <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title">
        </template>
        <template v-else>
          <img
              src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
              :alt="volumeInfo.title"
              width="128"
          >
        </template>

        <h4>{{ volumeInfo.title }}</h4>

        <p class="author">
          <span v-if="!volumeInfo.authors">No authors to display</span>
          <span v-else>
            By {{volumeInfo.authors[0]}}
          </span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    volumeInfo(){
      return this.book.volumeInfo
    }
  },
  watch: {
    $route(to, from) {
      if(to !== from) {
        location.reload();
    }}
  }
}
</script>

<style scoped>
ul {
  padding: 0;
}

ul li {
  display: inline-block;
}

ul li:first-child {
  list-style: none;
}
.author {
  font-size: 14px;
}
.book-item{
  padding: 12px 0;
  cursor: pointer;
}
.book-item:hover{
  background: #e9e9e9;
}
</style>
