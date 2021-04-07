<template>
  <div class="radiance-container">
    <img class="radiance-image" src="../assets/book3.png">
    <div class="radiance-title">
      <h1 class="book-title">Words of Radiance</h1>
      <div class="by">by
        <span class="kings-author">Brandon Sanderson </span>
      </div>
      <div class="pages">Pages: 1280</div>
      <div class="rating">Rating: 4.8/5</div>
      <div class="description">Description:</div>
      <div class="description-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis quam
        convallis arcu ultrices tristique. Vestibulum semper ipsum odio, sit amet vestibulum purus efficitur at. Aliquam
        ligula libero, blandit eget dictum nec, lobortis non mauris. Vestibulum auctor quis eros quis cursus. Sed
        varius, dui vitae fringilla euismod, mauris mauris iaculis dolor, ut
      </div>
      <div class="waiting">26 people waiting</div>
      <div class="discuss">
        <button class="discuss-button" type="submit" value="Submit">Discuss</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitingBook"
}
</script>

<style scoped>

.radiance-container {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;


}

.radiance-title {
  width: 67%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  border: 1px solid #dae0e5;
  border-radius: 0 8px 8px 0;

}

.book-title {
  font: normal normal bold 24px/32px Arial;
  color: #303030;
  opacity: 1;
}

.by {
  font: normal normal normal 15px/20px Arial;
  color: #8D8D8D;
  opacity: 1;
  padding-right: 30px;

}

.kings-author {
  font: normal normal bold 15px/20px Arial;
  color: #8D8D8D;
  opacity: 1;

}

.pages {
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 30px;

}

.rating {
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;
}

.description {
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;
}

.description-content {
  text-align: left;
  font: normal normal normal 15px/20px Arial;
  color: #8D8D8D;
  opacity: 1;
  width: 370px;
  word-wrap: break-word;
}

.waiting {
  font: normal normal bold 18px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;
}

.discuss {
  padding-top: 10px;
  outline: none;
}

.discuss-button {
  border: none;
  width: 110px;
  height: 35px;
  background: #0072D5;
  border-radius: 6px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}



</style>