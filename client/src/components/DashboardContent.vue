<template>
  <div class="content-middle">
    <div class="title-container">
      <h1 class="title-blue">Currently Reading Books</h1>
    </div>
    <div v-if="!loading" class=readingbooks-container>
      <CurrentlyReadingBook v-for="club in currentlyReadingBooksByClubs" :clubName="club.club" :bookId="club.book" v-bind:key="club.club"/>
    </div>
    <!--
    <div class="news-container">
      <h1 class="news-blue">News from your clubs</h1>
    </div>
    <div class="no-news">There are currently no news</div>
    -->
    <div class="upcoming-books">Upcoming Books</div>
    <div class="club">
      <i class="icon-clubIcon">
        <span class="club-name">The Flying Readers</span> </i>
    </div>
    <WaitingBook/>
    <div class="club-two">
      <i class="icon-clubIcon">
        <span class="clubtwo-name">Dark Fantasy</span>
      </i>
    </div>
    <Suggestion/>
  </div>
</template>


<script>
import CurrentlyReadingBook from "@/components/CurrentlyReadingBook";
import Suggestion from "@/components/Suggestion";
import WaitingBook from "./WaitingBook";
import axios from "axios";

export default {
  name: "DashboardContent",
  components: {
    WaitingBook,
    Suggestion,
    CurrentlyReadingBook
  },
  data(){
    return{
      userClubs:[],
      currentlyReadingClubs: {},
      currentlyReadingBooksByClubs:[],
      loading:true
    }
  },
  methods:{
    async getUserClubs(){
      let user = JSON.parse(localStorage.getItem("user"))
      try{
        let res = await axios.get('http://localhost:5000/clubs/getUserClubs', {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
        this.userClubs = res.data;
        this.getCurrentlyReadBooksByClubs();
        this.loading = false;
      } catch (err){
        console.log(err)
      }
    },
    getCurrentlyReadBooksByClubs(){
      let array = []
      this.userClubs.forEach(function (club){
           axios
               .get(`http://localhost:5000/clubBooks/getClubBookStatus/${club.club_id}`,
              { params: { status: true } })
               .then(res => {
                 let obj = {};
                 obj["book"] = res.data[0].book_id;
                 obj["club"] = club.club_name;
                 array.push(obj);
               })
      })
      this.currentlyReadingBooksByClubs = array;
    },
  },
  mounted() {
    this.getUserClubs();
  },

}


</script>

<style scoped>
.content-middle {
  width: calc(100% - 190px);
}

.title-container {
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  background-color: #f7f9fd;

}

.title-blue {
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;

}

.news-container {
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  background-color: #f7f9fd;

}

.news-blue {
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;
  padding-top: 25px;
}

.no-news {
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
  padding-left: 30px;
  background-color: white;
  font: normal normal normal 15px/24px Arial;
}

.upcoming-books {
  display: flex;
  margin-top:25px;
  padding-top: 25px;
  background-color: #f7f9fd;
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;

}
.icon-clubIcon {
  font: normal normal bold 22px/26px Arial ;
  color: #0072D5;
  opacity: 1;
  padding-top: 30px;
  padding-left: 25px;
  cursor: pointer;
}

.club{
  display: flex;

}

.club-name{
  font: normal normal bold 18px/24px Arial;
  padding-left: 10px;
}

.club-two{
  display: flex;
}

.clubtwo-name{
  font: normal normal bold 18px/24px Arial;
  padding-left: 10px;

}

</style>