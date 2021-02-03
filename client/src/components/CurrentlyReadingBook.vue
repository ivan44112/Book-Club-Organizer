<template>
  <div class="kings-container">
    <img class="kings-image" src="../assets/book1.png">
    <div class="kings-title">
      <div class="more">
        <a class="more-btn" href="#">More ></a>
      </div>
      <h1 class="book-title">The way of Kings</h1>
      <div class="by">by
        <span class="kings-author">Brandon Sanderson </span>
      </div>
      <i class="icon-clubIcon">
        <span class="club-name">The Flying Readers</span> </i>
      <div class="pages">Pages: 1040</div>
      <div class="rating">Rating: 4.7/5</div>
      <div class="average">
        <span class="member-page">Average member page:</span>
        <span class="page-number">548</span>
      </div>
      <div class="average-member">
        <div class="average-percent">
          <span class="avg-percent">54%</span>
        </div>
      </div>
      <div class="current-page">My current page:
        <span class="current-number">792</span>
        <div class="current-percent">
          <span class="curr-percent">62%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "CurrentlyReadingBook"
}
</script>

<style scoped>

.kings-container{
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;


}

.kings-title{
  width: 67%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  border: 1px solid #dae0e5;
  border-radius: 0 8px 8px 0;

}

.book-title{
  font: normal normal bold 24px/32px Arial;
  color: #303030;
  opacity: 1;
}

.by{
  font: normal normal normal 15px/20px Arial;
  color: #8D8D8D;
  opacity: 1;
  padding-right: 30px;

}

.kings-author{
  font: normal normal bold 15px/20px Arial;
  color: #8D8D8D;
  opacity: 1;

}

.icon-clubIcon{
  font: normal normal bold 20px/24px Arial;
  color: #0072D5;
  opacity: 1;
  padding-top: 30px;
  cursor: pointer;

}

.club-name{
  font: normal normal bold 18px/24px Arial;
  padding-left: 5px;

}

.pages{
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-right: 115px;
  padding-top: 30px;

}
.rating{
  font: normal normal bold 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-right: 115px;
  padding-top: 10px;
  overflow: hidden
}

.average-member{
  margin-top: 10px;
  border: 1px solid #109A3D;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;

}
.page-number{
  font: normal normal bold 14px/19px Arial;
  color: #109A3D;
  padding-left: 5px;

}
.average-percent{
  position: absolute;
  width: 54%;
  left: 0;
  top: 0;
  bottom: 0;
  background: #109A3D;
  text-align: center;
  border-radius: 8px;
}

.avg-percent{
  color: white;
  display: inline-block;
  text-align: center;
}

.member-page{
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 10px;
}

.current-page{
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  padding-top: 20px;

}
.current-number{
  font: normal normal bold 14px/19px Arial;
  color: #0072D5;
  opacity: 1;

}
.current-percent{
  margin-top: 10px;
  border: 1px solid #0072D5;
  border-radius: 8px;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  color: #727272;
  opacity: 1;
  height: 20px;
}

.curr-percent{
  width: 62%;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #0072D5;
  text-align: center;
  border-radius: 8px;
  color: white;
}

.more{
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  padding-top: 10px;


}

.more-btn{
  font: normal normal bold 14px/19px Arial;
  color: #0072D5;
  text-decoration: none;

}
</style>