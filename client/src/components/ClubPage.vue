<template>
  <div class="club-container">
    <div class="img-container">
      <p>{{currentClub[0].club_name}}</p>
      <img src="../assets/club1.png" alt="cover"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "ClubPage",
  data(){
    return{
      currentClub:{}
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
  }
</style>