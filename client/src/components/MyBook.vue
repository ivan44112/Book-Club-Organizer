<template>
  <div class="book-container">
    <div class="book-progress">
      <img src="../assets/book2.png">
      <div class="book-percent">
        <span class="book-count">37%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBook"
}
</script>

<style scoped>
.book-container{
  padding-top: 25px;
  padding-left: 30px;
}

.book-percent {
  margin-top: 10px;
  border: 1px solid #0072D5;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;
  border-left: #0072D5;
}

.book-count {
  width: 37%;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #0072D5;
  text-align: center;
  border-radius: 8px;
  color: white;
}
</style>