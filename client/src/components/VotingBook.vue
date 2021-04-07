<template>
  <div class="voting-book-container">
    <img src="../assets/book2.png">
    <button>Vote</button>
  </div>
</template>

<script>
export default {
  name: "VotingBook"
}
</script>

<style scoped>
  .voting-book-container{
    display: flex;
    flex-direction: column;
    padding: 15px;
  }
  .voting-book-container img{
    width: 200px;
  }
  .voting-book-container button{
    width: 100px;
    align-self: center;
    margin-top: 15px;
    border: none;
    height: 30px;
    background: #0072D5;
    border-radius: 4px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    font-weight: bold;
  }
</style>