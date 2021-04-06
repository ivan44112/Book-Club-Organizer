<template>
  <div class="clubs">
    <div class="title-container">
      <h1 class="title-blue">My Book Clubs</h1>
    </div>
    <div>
      <ClubCard v-for="club in allClubs" v-bind:key="club.club_id" :club="club"/>
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
      allClubs:[]
    }
  },
  methods:{
    async getAllClubs(){
      try{
        let res = await axios.get('http://localhost:5000/clubs/getClubs')
        this.allClubs = res.data;
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

</style>