<template>
 <div class="voting-section-container">
   <div v-if="currentClub.voting_phase">
     <div class="voting-description">
       <h1>Voting phase</h1>
       <p v-if="!userIsAdmin || bookSuggested">You can vote or suggest multiple books for the next read</p>
     </div>
     <div v-if="votingBooks" class="voting-container-data">
       <VotingBook v-for="book in votingBooks" v-bind:key="book.book_id" :book="book" :userIsAdmin="userIsAdmin" :votes="book.votes" :currentClub="currentClub" :toggleVotingPhase="toggleVotingPhase"/>
     </div>
   </div>
   <div v-if="!currentClub.voting_phase" class="voting-description margin-bottom">
     <h1>Voting phase not started yet</h1>
     <button v-if="userIsAdmin" v-on:click="toggleVotingPhase" class="start-voting">Start</button>
   </div>
 </div>
</template>

<script>
import VotingBook from "./VotingBook";
import axios from "axios";
export default {
  name: "Voting",
  components: {VotingBook},
  data(){
    return{
      votingBooks: [],
      bookSuggested: false,
      votingPhaseChanged: false
    }
  },
  props: {
    currentClub: {
      type: Object
    },
    user: {
      type: Object
    },
    userIsAdmin: {
      type: Boolean
    }
  },
  methods:{
    async getVotingBooks(){
      try{
        let res = await axios.get(`http://localhost:5000/bookSuggestions/getBooks/${this.$route.params.id}`)
        this.votingBooks = res.data;
      } catch (err){
        console.log(err)
      }
    },

    async toggleVotingPhase(){
      try{
        let res = await axios.patch(`http://localhost:5000/clubs/changeVotingPhase/${this.$route.params.id}`)
        if(res.data){
          this.votingPhaseChanged = true
          this.$router.go()
        }
      } catch (err){
        console.log(err)
      }
    }
  },
  mounted() {
    this.getVotingBooks()
  }
}
</script>

<style scoped>
.voting-container-data{
  display: flex;
  flex-wrap: wrap;
}

.voting-description{
  text-align: left;
  margin-left: 20px;
}

.voting-description h1{
  font-size:20px;
}

.voting-description p{
  font-size:16px;
}

.start-voting{
  width: 110px;
  align-self: center;
  margin-top: 5px;
  border: none;
  height: 36px;
  background: #0072D5;
  border-radius: 4px;
  color: #FFFFFF;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}

.start-voting:hover{
  background: #1891ff;
}

.margin-bottom{
  margin-bottom: 30px;
}
</style>