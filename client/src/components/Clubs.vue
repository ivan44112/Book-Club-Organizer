<template>
  <div class="clubs">
    <div class="title-container">
      <h1 class="title-blue">My Book Clubs</h1>
    </div>
    <div class="card-container">
      <ClubCard v-for="club in userClubs" v-bind:key="club.club_id" :club="club"/>
    </div>
  </div>
</template>

<script>
import ClubCard from "./ClubCard";
import axios from "axios";
export default {
  name: "Clubs",
  components: {
    ClubCard

  },
  data(){
    return{
      userClubs:[]
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
      } catch (err){
        console.log(err)
      }
    }
  },
  mounted() {
    this.getUserClubs();
  }
}
</script>

<style scoped>

.clubs {
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

.card-container{
  padding-bottom: 30px;
}
</style>