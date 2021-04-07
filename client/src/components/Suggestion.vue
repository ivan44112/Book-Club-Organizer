<template>
<div class="suggestion-container">
  <img class="suggestion-image" src="../assets/bookSuggest.png">
  <div class="suggestion-title">
    <h1 class="book-title">Suggestion Phase</h1>
    <div class="suggestion-number">3 books suggested
    </div>
    <span class="alert">Suggest one book for the next read</span>
    <span class="alert">Your book will stay hidden until voting phase starts</span>
    <div class="suggest">
      <button class="suggest-button" type="submit">Start voting phase</button>
    </div>
</div>


</div>
</template>

<script>
export default {
name: "Suggestion"
}
</script>

<style scoped>
.suggestion-container {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;


}

.suggestion-title {
  width: 67%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  border: 1px solid #dae0e5;
  border-radius: 0 8px 8px 0;
  font-size: 14px;

}

.suggestion-number{
  font: normal normal bold 18px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 30px;
}

.alert{
  font: normal normal  16px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;
}

.suggest{
  padding-top: 10px;
  outline: none;
}

.suggest-button {
  border: none;
  width: 160px;
  height: 42px;
  background: #0072D5;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  margin-top:20px;
}
</style>