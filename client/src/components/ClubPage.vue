<template>
  <div class="club-container">
    <div class="club-section">
      <div class="img-container">
        <img src="../assets/club1.png" alt="cover"/>
      </div>
      <div class="club-data-container">
        <h1 class="club-name blue">{{currentClub[0].club_name}}</h1>
        <div class="data-item">
          <p>Club admin:</p>
          <p class="bold blue">{{currentClub[0].admin}}</p>
        </div>
        <div class="data-item">
          <p>Category:</p>
          <p class="bold">{{currentClub[0].category}}</p>
        </div>
        <div class="data-item">
          <p>Members:</p>
          <p class="bold">32</p>
        </div>
        <div class="data-item">
          <p>Books read:</p>
          <p class="bold">{{currentClub[0].books_read}}</p>
        </div>
        <div class="data-item">
          <p>{{currentClub[0].description}}</p>
        </div>
      </div>
    </div>
    <div class="currently-reading-section-container">
      <h1 class="blue-title">Currently reading</h1>
      <div class="currently-reading-data-container">
        <CurrentlyReadingBook/>
      </div>
    </div>
    <div class="upcoming-section-container">
      <h1 class="blue-title">Upcoming title</h1>
      <div class="upcoming-title-data-container">
        <Suggestion v-if="nextBookPhase === 'suggestion' "/>
        <WaitingBook v-if="nextBookPhase === 'waiting' "/>
        <Voting v-if="nextBookPhase === 'voting' "/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CurrentlyReadingBook from "./CurrentlyReadingBook";
import Voting from "./Voting";
import Suggestion from "./Suggestion";
import WaitingBook from "./WaitingBook";

export default {
name: "ClubPage",
  components: {WaitingBook, Suggestion, Voting, CurrentlyReadingBook},
  data(){
    return{
      currentClub:{},
      nextBookPhase:"voting"
    }
  },
  methods:{
    async getAllClubs(){
      try{
        let res = await axios.get('http://localhost:5000/clubs/getClubs')
        let allClubs = res.data;
        this.currentClub = allClubs.filter(club => club.club_id === this.$route.params.id)
        console.log(this.currentClub)
      } catch (err){
        console.log(err)
      }
    }
  },
  mounted() {
  this.getAllClubs();
  }
}

</script>

<style scoped>
  .club-container{
    width: calc(100% - 190px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 60px;
  }
  .club-section{
    padding: 20px;
  }
  .club-data-container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .club-name{
    margin: 15px 0;
    font-size: 22px;
  }
  .data-item{
    display: flex;
    flex-direction: row;
  }
  .data-item p{
    margin: 8px 3px 8px 0;
  }
  .bold{
    font-weight: bold;
  }
  .blue{
    color: #0072D5;
  }
  .currently-reading-section-container{
    width: 100%;
  }
  .upcoming-section-container{
    margin-top: 25px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
  .blue-title{
    color: #0072D5;
    width: 100%;
    display: flex;
    padding: 10px 0 10px 20px;
    background-color: #f7f9fd;
    font-size: 22px;
  }
  .upcoming-title-data-container{
    width: 100%;
  }
</style>