<template>
  <div class="club-card-container">
    <img class="club-img" src="../assets/club2.png">
    <p class="club-title">Dark Fantasy</p>
    <div class="card-details">
      <p>Currently Reading:</p>
      <p class="currently-reading-title">The Prince of Thorns</p>
      <p>Members: 18</p>
      <p>Books read: 5</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExploreClubCard"
}
</script>

<style scoped>
  .club-card-container{
    width: 250px;
    margin: 10px;
    position: relative;
    box-shadow: 0 3px 6px #00000026;
    border-radius: 10px;
  }
  .club-img{
    width:100%;
    border-radius: 10px 10px 0 0;
  }
  .club-title{
    color:#0072D5;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 12px 10px 12px;
  }
  .card-details{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 12px;
    margin-bottom: 8px;
  }
  .card-details p{
    margin: 5px 0;
    font-size: 14px;
  }
  .currently-reading-title{
    color:#0072D5;
    font-weight: bold;
    font-size: 16px !important;
  }
</style>