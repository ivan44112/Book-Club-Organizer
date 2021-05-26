<template>
  <router-link v-bind:to="{ name: 'club', params: {id: club.club_id}}" :key="$route.path">
    <div class="club1-container">
      <img class="club1-image" src="../assets/club1.png">
      <div class="club1-title">
        <h1 class="club-name">{{club.club_name}}</h1>
        <div class="owner">Owner:
          <span class="owner-name">{{clubAdmin}}
            <!--<img class="ana-image" src="../assets/anasmith.png"> -->
          </span>
        </div>
        <!--
        <div class="currently-reading">Currently Reading:
          <span class="book-name">{{currentlyReadingTitle ? currentlyReadingTitle : "None" }}</span>
           <span class="read-percent">(54%)</span>
        </div>
        <div class="upcoming-book">Upcoming Book:
          <span class="upcoming-name">{{ upcomingTitle }}</span>
        </div>
        -->
        <div class="members">Members:
          <span class="members-count">{{clubMemberCount}}</span>
        </div>
        <div class="members">Category:
          <span class="books-count">{{club.category}}</span>
        </div>
        <div class="books-read">Books read:
          <span class="books-count">{{club.books_read}}</span>
        </div>
        <!--
        <div class="more">
          <a class="more-btn" href="#">More ></a>
        </div>
        -->
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from "axios";

export default {
  name: "ClubCard",
  data(){
    return{
      currentlyReadingTitle:"",
      upcomingTitle:"Not decided",
      clubMemberCount:0,
      clubAdmin:""
    }
  },
  props: {
    club: {
      type: Object
    },
  },
  methods:{
    getCurrentlyReadingBook() {
      if(this.club.current_book){
        axios
            .get(`https://www.googleapis.com/books/v1/volumes/${this.club.current_book}`)
            .then(response => {
              this.currentlyReadingTitle = response.data.volumeInfo.title;
            })
      }else{
        this.currentlyReadingTitle = ""
      }
    },
    getClubMemberCount() {
      axios
          .get(`http://localhost:5000/clubs/countMembers/${this.club.club_id}`)
          .then(response => {
            this.clubMemberCount = response.data.count;
          })
    },
    getClubAdmin(){
      axios
          .get(`http://localhost:5000/auth/currentUserById/${this.club.admin}`)
          .then(response => {
            this.clubAdmin = response.data.name;
          })
    }
  },
  mounted() {
    this.getCurrentlyReadingBook()
    this.getClubMemberCount();
    this.getClubAdmin();
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.club1-container {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;
  cursor: pointer;
  height: 215px;
}

.club1-title {
  width: 67%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  border: 1px solid #dae0e5;
  border-radius: 0 8px 8px 0;
}

.club-name {
  font: normal normal bold 24px/32px Arial;
  color: #0072D5;
  cursor: pointer;
  text-decoration: none !important;
}

.owner {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #727272;
  opacity: 1;
  display: flex;
}

.owner-name {
  font: normal normal bold 20px/21px Arial;
  padding-left: 5px;
  display: flex;
}

.ana-image {
  width: 25px;
  display: flex;
  padding-left: 10px;
}

.currently-reading {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.book-name {
  color: #0072D5;
  cursor: pointer;
  font: normal normal bold 19px/23px Arial;
}

.read-percent {
  color: #0072D5;
  cursor: pointer;
  font: normal normal bold 14px/23px Arial;
  padding-left: 7px;
}

.upcoming-book {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.upcoming-name {
  font: normal normal bold 20px/21px Arial;
  padding-left: 5px;
}

.members {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.members-count {
  font: normal normal bold 20px/21px Arial;
}

.books-read {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.books-count {
  font: normal normal bold 20px/21px Arial;
}

.more {
  display: flex;
  justify-content: flex-start;
  padding-right: 20px;
  padding-top: 10px;


}

.more-btn {
  font: normal normal bold 16px/19px Arial;
  color: #0072D5;
  text-decoration: none;

}
</style>