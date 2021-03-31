<template>
  <div class="fantasy-container">
    <img class="club2-image" src="../assets/club2.png">
    <div class="club2-title">
      <h1 class="club-name">Dark Fantasy</h1>
      <div class="owner">Owner:
        <span class="owner-name">Robert Miller
          <img class="robert-image" src="../assets/robertmiller.png">
        </span>
      </div>
      <div class="currently-reading">Currently Reading:
        <span class="book-name">The prince of Thorns</span>
        <span class="read-percent">(37%)</span>
      </div>
      <div class="upcoming-book">Upcoming Book:
        <span class="upcoming-name">Suggestion Phase</span>
      </div>
      <div class="members">Members:
        <span class="members-count">17</span>
      </div>
      <div class="books-read">Books read:
        <span class="books-count">5</span>
      </div>
      <div class="more">
        <a class="more-btn" href="#">More ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DarkFantasy"
}
</script>

<style scoped>

.fantasy-container {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-left: 30px;
  text-align: left;

}


.club2-title {
  width: 67%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  border: 1px solid #dae0e5;
  border-radius: 0 8px 8px 0;
}

.club-name {
  font: normal normal bold 24px/32px Arial;
  color: #0072D5;
  cursor: pointer;
}

.owner {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #727272;
  opacity: 1;
  display: flex;
}

.owner-name {
  font: normal normal bold 20px/21px Arial;
  padding-left: 5px;
  display: flex;
}

.robert-image {
  width: 25px;
  display: flex;
  padding-left: 10px;
}

.currently-reading {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.book-name {
  color: #0072D5;
  cursor: pointer;
  font: normal normal bold 19px/23px Arial;
}

.read-percent {
  color: #0072D5;
  cursor: pointer;
  font: normal normal bold 14px/23px Arial;
  padding-left: 7px;
}

.upcoming-book {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.upcoming-name {
  font: normal normal bold 20px/21px Arial;
  padding-left: 5px;
}

.members {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.members-count {
  font: normal normal bold 20px/21px Arial;
}

.books-read {
  text-align: left;
  font: normal normal normal 20px/21px Arial;
  color: #858585;
  padding-top: 15px;
}

.books-count {
  font: normal normal bold 20px/21px Arial;
}

.more {
  display: flex;
  justify-content: flex-start;
  padding-right: 20px;
  padding-top: 10px;


}

.more-btn {
  font: normal normal bold 16px/19px Arial;
  color: #0072D5;
  text-decoration: none;

}

</style>