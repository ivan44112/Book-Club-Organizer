<template>
 <div class="voting-section-container">
   <div class="voting-description">
     <h1>Voting phase</h1>
     <p>You can vote for one book for the next read</p>
   </div>
   <div class="voting-container-data">
     <VotingBook/>
     <VotingBook/>
   </div>
 </div>
</template>

<script>
import VotingBook from "./VotingBook";
export default {
  name: "Voting",
  components: {VotingBook}
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