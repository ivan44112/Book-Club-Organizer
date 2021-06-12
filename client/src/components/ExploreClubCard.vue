<template>
  <router-link v-bind:to="{ name: 'club', params: {id: club.club_id}}" :key="$route.path">
    <div class="club-card-container">
      <img class="club-img" src="../assets/club2.png">
      <p class="club-title">{{club.club_name}}</p>
      <div class="card-details">
        <p>Currently Reading:</p>
        <p v-if="currentlyReadingTitle" class="currently-reading-title">{{currentlyReadingTitle}}</p>
        <p>Members: {{clubMemberCount}}</p>
        <p>Books read: {{club.books_read}}</p>
        <p class="categories">Category: {{club.category}}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from "axios";

export default {
  name: "ExploreClubCard",
  data(){
    return{
      currentlyReadingTitle:"",
      clubMemberCount:0
    }
  },
  props: {
    club: {
      type: Object
    },
  },
  methods:{
    async getCurrentlyReadingBook(){
      axios
          .get(`/clubBooks/getClubBookStatus/${this.club.club_id}`,
              { params: { status: true } })
          .then(res => {
            if(res.data[0]){
              axios
                  .get(`https://www.googleapis.com/books/v1/volumes/${res.data[0].book_id}`)
                  .then(response => {
                    this.currentlyReadingTitle = response.data.volumeInfo.title;
                  })
            }
          })
    },
    getClubMemberCount() {
      axios
          .get(`/clubs/countMembers/${this.club.club_id}`)
          .then(response => {
            this.clubMemberCount = response.data.count;
          })
    }
  },
  mounted() {
    this.getCurrentlyReadingBook();
    this.getClubMemberCount();
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  p{
    color: #414141;
  }
  .club-card-container{
    width: 250px;
    margin: 10px;
    position: relative;
    box-shadow: 0 3px 6px #00000026;
    border-radius: 10px;
  }
  .club-card-container:hover{
    box-shadow: 0 3px 6px #00000016;
    transform: scale(1.01);
    transition: 0.1s;
  }
  .club-img{
    width:100%;
    border-radius: 10px 10px 0 0;
  }
  .club-title{
    color:#0072D5;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 12px 10px 12px;
  }
  .card-details{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 12px 5px 12px;
    margin-bottom: 8px;
  }
  .card-details p{
    margin: 5px 0;
    font-size: 14px;
  }
  .currently-reading-title{
    color:#0072D5;
    font-weight: bold;
    font-size: 16px !important;
  }
  .categories{
    text-align: left;
  }
</style>