<template>
  <div class="clubs">
    <div class="title-container">
      <h1 class="title-blue">My Book Clubs</h1>
    </div>
    <div>
      <ClubCard/>
    </div>
  </div>
</template>

<script>
import ClubCard from "./ClubCard";
export default {
  name: "Clubs",
  components: {
    ClubCard

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