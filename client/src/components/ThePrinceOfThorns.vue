<template>
<div v-if="!loading" class="prince-container">
  <img class="prince-image" :src="volumeInfo.imageLinks.thumbnail">
  <div class="prince-title">
    <h1 class="book-title">{{volumeInfo.title}}</h1>
    <div class="by">by
      <span v-if="volumeInfo.authors" class="kings-author">{{volumeInfo.authors[0]}}</span>
    </div>
    <router-link class="router-link" v-bind:to="{ name: 'club', params: {id: currentClub[0].club_id}}" :key="$route.path">
      <i class="icon-clubIcon">
        <span class="club-name">{{currentClub[0].club_name}}</span>
      </i>
    </router-link>
    <div class="pages">Pages: {{volumeInfo.pageCount}}</div>
    <div class="rating">Rating: {{volumeInfo.averageRating}}/5</div>
    <div class="average">
      <span class="member-page">Club average page:<span class="page-number">{{averageClubPage}}</span></span>
    </div>
    <div class="current-page">My current page:
      <span class="current-number">{{currPage}}</span>
      <div class="current-percent">
        <span v-bind:style="percent" class="curr-percent">{{userPagePercent}}%</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ThePrinceOfThorns",
  data(){
    return{
      loading:true,
      userPagePercent:"",
      averageClubPage:""
    }
  },
  props: {
    book: {
      type: Object,
      required: true
    },
    currentClub:{
      type: Array
    },
    userBookData:{
      type:Array
    },
    currPage:{
      type: null
    }
  },
  computed: {
    volumeInfo(){
      return this.book.volumeInfo
    },
    percent(){
      return {
        width: this.userPagePercent + "%"
      }
    }
  },
  methods:{
    async getAveragePage(){
      let config = {
        params: {
          book_id: this.book.id
        }
      }
      await axios
          .get(`http://localhost:5000/books/calculateAvg/${this.currentClub[0].club_id}`,config)
          .then(res => {
            this.averageClubPage = res.data[0].round
            this.loading = false;
          })
    }
  },
  watch: {
    currPage: function() {
      this.userPagePercent = Math.floor((this.currPage / this.book.volumeInfo.pageCount) * 100);
    }
  },
  mounted() {
    this.userPagePercent = Math.floor((this.currPage / this.book.volumeInfo.pageCount) * 100);
    this.getAveragePage();
  }
}
</script>

<style scoped>
.prince-container {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;


}

.prince-title {
  width: 67%;
  display: flex;
  flex-direction: column;
  padding: 0 15px 15px 35px;
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
.average{
  margin-top:5px;
}

.current-page {
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 20px;

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
  width: 73%;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #0072D5;
  text-align: center;
  border-radius: 8px;
  color: white;
}

.prince-image{
  width:220px;
}

.router-link{
  margin-top: 20px;
  text-decoration: none;
}
.page-number{
  color: #109A3D;
}

</style>