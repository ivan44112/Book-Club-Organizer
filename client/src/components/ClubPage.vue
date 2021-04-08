<template>
  <div class="club-container">
    <div class="club-section">
      <div class="img-container">
        <img src="../assets/club1.png" alt="cover"/>
      </div>
      <div class="club-data-container">
        <h1 class="club-name blue">{{currentClub.club_name}}</h1>
        <div class="data-item">
          <p>Club admin:</p>
          <p class="bold blue">{{clubAdmin}}</p>
        </div>
        <div class="data-item">
          <p>Category:</p>
          <p class="bold">{{currentClub.category}}</p>
        </div>
        <div class="data-item">
          <p>Members:</p>
          <p class="bold">32</p>
        </div>
        <div class="data-item">
          <p>Books read:</p>
          <p class="bold">{{currentClub.books_read}}</p>
        </div>
        <div class="data-item">
          <p>{{currentClub.description}}</p>
        </div>
        <button v-if="!this.userClubs.find(club => club.club_id === this.currentClub.club_id)"
                v-on:click="joinClub"
                class="join-club-button"
                v-bind:class = "(this.clubJoined)?'disable_button':''">
          Join {{currentClub.club_name}}
        </button>
        <button class="leave_club-button" v-else
                v-bind:class = "(this.clubLeft)?'disable_button':''">
                Leave {{currentClub.club_name}}</button>
      </div>
    </div>
    <div class="currently-reading-section-container">
      <h1 class="blue-title">Currently reading</h1>
      <div class="currently-reading-data-container">
        <CurrentlyReadingBook :club="currentClub"/>
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
      nextBookPhase:"voting",
      clubAdmin:"",
      userClubs:[],
      clubJoined:false,
      clubLeft:false
    }
  },
  methods:{
    async getAllClubs(){
      try{
        let res = await axios.get('http://localhost:5000/clubs/getClubs')
        let allClubs = res.data;
        let club = allClubs.filter(club => club.club_id === this.$route.params.id)
        this.currentClub = club[0];
      } catch (err){
        console.log(err)
      }
      await this.getClubAdmin();
    },
    async getClubAdmin(){
      try{
        let res = await axios.get(`http://localhost:5000/auth/currentUserById/${this.currentClub.admin}`)
        this.clubAdmin = res.data.name;
      } catch (err){
        console.log(err)
      }
    },
    async getUserClubs(){
      let user = JSON.parse(localStorage.getItem("user"))
      try{
        let res = await axios.get('http://localhost:5000/clubs/getUserClubs', {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
        this.userClubs = res.data;
      } catch (err){
        console.log(err)
      }
    },
    async joinClub(){
      let user = JSON.parse(localStorage.getItem("user"))
      let data = {}
      let config = {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      };
      try{
        let res = await axios.post(`http://localhost:5000/clubs/addMember/${this.currentClub.club_id}`,data,config)
        if(res.data){
          this.clubJoined = true;
          alert("You successfully joined this club")
        }
      } catch (err){
        console.log(err)
      }
    }
  },
  mounted() {
  this.getAllClubs();
  this.getUserClubs();
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
  .join-club-button{
    margin-top:20px;
    padding:12px 20px;
    border: none;
    background: #0072D5;
    border-radius: 4px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    font-weight: bold;
    font-size: 15px;
  }
  .leave_club-button{
    margin-top:20px;
    padding:12px 20px;
    border: none;
    background: #ff3d3d;
    border-radius: 4px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    font-weight: bold;
    font-size: 15px;
  }
  .disable_button{
    opacity: 0.3;
    transition: 0.2s;
    pointer-events: none;
  }
</style>