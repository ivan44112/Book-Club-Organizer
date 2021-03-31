<template>
<div class="prince-container">
  <img class="prince-image" src="../assets/book2.png">
  <div class="prince-title">
    <h1 class="book-title">The prince of Thorns</h1>
    <div class="by">by
      <span class="kings-author">Mark Lawrence </span>
    </div>
    <i class="icon-clubIcon">
      <span class="club-name">Dark Fantasy</span> </i>
    <div class="pages">Pages: 357</div>
    <div class="rating">Rating: 4.3/5</div>
    <div class="average">
      <span class="member-page">Average member page:</span>
      <span class="page-number">110</span>
    </div>
    <div class="average-member">
      <div class="average-percent">
        <span class="avg-percent">37%</span>
      </div>
    </div>
    <div class="current-page">My current page:
      <span class="current-number">238</span>
      <div class="current-percent">
        <span class="curr-percent">73%</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "ThePrinceOfThorns"
}
</script>

<style scoped>
.prince-container {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;


}

.prince-title {
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

.icon-clubIcon {
  font: normal normal bold 20px/24px Arial;
  color: #0072D5;
  opacity: 1;
  padding-top: 30px;
  cursor: pointer;

}

.club-name {
  font: normal normal bold 18px/24px Arial;
  padding-left: 5px;

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

.average-member {
  margin-top: 10px;
  border: 1px solid #109A3D;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;

}

.page-number {
  font: normal normal bold 14px/19px Arial;
  color: #109A3D;
  padding-left: 5px;

}

.average-percent {
  position: absolute;
  width: 37%;
  left: 0;
  top: 0;
  bottom: 0;
  background: #109A3D;
  text-align: center;
  border-radius: 8px;
}

.avg-percent {
  color: white;
  display: inline-block;
  text-align: center;
}

.member-page {
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;
}

.current-page {
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 20px;

}

.current-number {
  font: normal normal bold 14px/19px Arial;
  color: #0072D5;
  opacity: 1;

}

.current-percent {
  margin-top: 10px;
  border: 1px solid #0072D5;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;
}

.curr-percent {
  width: 73%;
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