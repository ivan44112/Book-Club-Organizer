<template>
 <div class="voting-section-container">
   <div class="voting-description">
     <h1>Voting phase</h1>
     <p>You can vote for one book for the next read</p>
   </div>
   <div v-if="votingBooks" class="voting-container-data">
     <VotingBook v-for="book in votingBooks" v-bind:key="book.book_id" :book="book"/>
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
      loading:true,
    }
  },
  props: {
    currentClub: {
      type: Object
    },
  },
  methods:{
    async getVotingBooks(){
      try{
        let res = await axios.get(`http://localhost:5000/bookSuggestions/getBooks/${this.$route.params.id}`)
        this.votingBooks = res.data;
        this.loading = false
      } catch (err){
        console.log(err)
      }
    },
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


</style>