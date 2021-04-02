<template>
  <div class="explore-container">
    <div class="title-container">
      <h1 class="title-blue">Explore Book Clubs</h1>
    </div>
    <div class="input-container">
      <form>
        <input class="search-input" type="text"  placeholder="Search by name">
      </form>
      <multiselect v-model="value" :options="options"></multiselect>
    </div>
    <div class="card-container">
      <ExploreClubCard/>
      <ExploreClubCard/>
      <ExploreClubCard/>
      <ExploreClubCard/>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import ExploreClubCard from "./ExploreClubCard";

export default {
  name: "ExploreClubs",
  components: {ExploreClubCard, Multiselect},
  data() {
    return{
      value:null,
      options: ["Adventure", "Horror", "Biography", "Action", "Fantasy"]
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.explore-container{
  width: calc(100% - 190px);
}
.title-blue {
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;
}
.title-container {
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  background-color: #f7f9fd;
}
.input-container{
  padding-left:30px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top:20px;
}
.input-container form{
  width: 100%;
  display: flex;
  position: relative;
}
.search-input{
  border:none;
  padding:15px 0 5px 0;
  outline: none;
  width:100%;
  font-size: 15px;
  color:#616161;
  border-bottom: 1px solid #707070;
}
.multiselect{
  margin-top: 20px;
}
.card-container{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>