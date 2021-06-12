<template>
  <router-link :to="{ name: 'book', params: {id: book.id} }" :key="$route.path">
    <div v-if="!loading" class="kings-container">
      <template v-if="book.volumeInfo.imageLinks">
        <img class="kings-image" :src="book.volumeInfo.imageLinks.thumbnail" :alt="book.volumeInfo.title">
      </template>
      <template v-else>
        <img
            src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
            :alt="book.volumeInfo.title"
            width="128"
        >
      </template>
      <div class="kings-title">
        <h1 class="book-title">{{book.volumeInfo.title}}</h1>
        <div class="by">by
          <span class="kings-author">{{book.volumeInfo.authors[0]}}</span>
        </div>
        <i v-if="clubName" class="icon-clubIcon">
          <span class="club-name">{{clubName}}</span> </i>
        <div class="pages">Pages: {{book.volumeInfo.pageCount}}</div>
        <div class="rating">Rating: {{book.volumeInfo.averageRating}}/5</div>

        <div class="average">
          <span class="member-page">Average club page:</span>
          <span class="page-number">{{averageClubPage}}</span>
        </div>

        <!--
        <div v-if="clubAveragePagePercent" class="average-member">
          <div class="average-percent">
            <span v-bind:style="avgPercent" class="avg-percent">{{clubAveragePagePercent}}%</span>
          </div>
        </div>
        -->
        <div v-if="userBookData[0]" class="current-page">My current page:
          <span class="current-number">{{userBookData[0].current_page}}</span>
          <div class="current-percent">
            <span v-bind:style="percent" class="curr-percent">{{userPagePercent}}%</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>


import axios from "axios";

export default {
  name: "CurrentlyReadingBook",
  data(){
    return{
      book:{},
      userBookData:{},
      loading:true,
      userPagePercent:"",
      averageClubPage:""
    }
  },
  props: {
    clubName: {
      type: String
    },
    bookId:{
      type: String
    },
    clubId:{
      type: String
    }
  },
  computed:{
    percent(){
      return {
        width: this.userPagePercent + "%"
      }
    }
  },
  methods:{
    async getBookData(){
      await axios
          .get(`https://www.googleapis.com/books/v1/volumes/${this.bookId}`)
          .then(response => {
            this.book = response.data;
          })
      await this.getUserBookData();
      await this.getAveragePage()
    },
    async getUserBookData(){
      let user = JSON.parse(localStorage.getItem("user"))
      let config = {
        headers: { "Authorization": `Bearer ${user.token}`},
        params: { status: 1 }
      }
      axios
          .get(`http://localhost:5000/books/getUserBooks/${this.bookId}`, config)
          .then(res => {
            let result;
            let asd = res.data
            result = asd.filter(book => book.book_id === this.bookId)
            this.userBookData = result
            console.log(result)
            this.userPagePercent = Math.floor((this.userBookData[0].current_page / this.book.volumeInfo.pageCount) * 100);
          })
    },
    async getAveragePage(){
      let config = {
        params: {
          book_id: this.bookId
        }
      }
      axios
          .get(`http://localhost:5000/books/calculateAvg/${this.clubId}`,config)
          .then(res => {
            console.log(res.data)
            this.averageClubPage = res.data[0].round
            this.loading = false;
          })
    }

  },
  mounted() {
    this.getBookData();
  }
}
</script>

<style scoped>

.kings-container {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;
}
.kings-image{
  width:230px;
}

.kings-title {
  width: 67%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 20px;
  border: 1px solid #dae0e5;
  border-radius: 0 8px 8px 0;
}

.book-title {
  font: normal normal bold 24px/32px Arial;
  color: #303030;
  opacity: 1;
}

.by {
  font: normal normal normal 15px/20px Arial;
  color: #8D8D8D;
  opacity: 1;
  padding-right: 30px;

}

.kings-author {
  font: normal normal bold 15px/20px Arial;
  color: #8D8D8D;
  opacity: 1;

}

.icon-clubIcon {
  font: normal normal bold 20px/24px Arial;
  color: #0072D5;
  opacity: 1;
  padding-top: 30px;
  cursor: pointer;

}

.club-name {
  font: normal normal bold 18px/24px Arial;
  padding-left: 5px;

}

.pages {
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 30px;

}

.rating {
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;

}

.average-member {
  margin-top: 10px;
  border: 1px solid #109A3D;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;

}

.page-number {
  font: normal normal bold 14px/19px Arial;
  color: #109A3D;
  padding-left: 5px;

}

.average{
  margin-top:8px;
}

.average-percent {
  position: absolute;
  width: 0%;
  left: 0;
  top: 0;
  bottom: 0;
  background: #109A3D;
  text-align: center;
  border-radius: 8px;
}

.avg-percent {
  color: white;
  display: inline-block;
  text-align: center;
}

.member-page {
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;
}

.current-page {
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 8px;

}

.current-number {
  font: normal normal bold 14px/19px Arial;
  color: #0072D5;
  opacity: 1;

}

.current-percent {
  margin-top: 10px;
  border: 1px solid #0072D5;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;
}

.curr-percent {
  width: 62%;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #0072D5;
  text-align: center;
  border-radius: 8px;
  color: white;
}

.more {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  padding-top: 10px;
}

.more-btn {
  font: normal normal bold 14px/19px Arial;
  color: #0072D5;
  text-decoration: none;
}
a{
  text-decoration: none;
}
</style>