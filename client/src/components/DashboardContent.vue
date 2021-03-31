<template>

  <div class="content-middle">
    <div class="title-container">
      <h1 class="title-blue">Currently Reading Books</h1>
    </div>
    <div class=readingbooks-container>
      <CurrentlyReadingBook/>
      <ThePrinceOfThorns/>
    </div>
    <div class="news-container">
      <h1 class="news-blue">News from your clubs</h1>
    </div>
    <div class="no-news">There are currently no news</div>
    <div class="upcoming-books">Upcoming Books</div>
    <div class="club">
      <i class="icon-clubIcon">
        <span class="club-name">The Flying Readers</span> </i>
    </div>
    <WordsOfRadiance/>
    <div class="club-two">
      <i class="icon-clubIcon">
        <span class="clubtwo-name">Dark Fantasy</span>
      </i>
    </div>
    <Suggestion/>

  </div>


</template>


<script>
import CurrentlyReadingBook from "@/components/CurrentlyReadingBook";
import ThePrinceOfThorns from "@/components/ThePrinceOfThorns";
import WordsOfRadiance from "@/components/WordsOfRadiance";
import Suggestion from "@/components/Suggestion";

export default {
  name: "DashboardContent",
  components: {
    Suggestion,
    WordsOfRadiance,
    ThePrinceOfThorns,
    CurrentlyReadingBook
  }
}


</script>

<style scoped>


.content-middle {
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

.news-container {
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  background-color: #f7f9fd;

}

.news-blue {
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;
  padding-top: 25px;
}

.no-news {
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
  padding-left: 30px;
  background-color: white;
  font: normal normal normal 15px/24px Arial;
}

.upcoming-books {
  display: flex;
  padding-top: 25px;
  background-color: #f7f9fd;
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;

}
.icon-clubIcon {
  font: normal normal bold 22px/26px Arial ;
  color: #0072D5;
  opacity: 1;
  padding-top: 30px;
  padding-left: 25px;
  cursor: pointer;
}

.club{
  display: flex;

}

.club-name{
  font: normal normal bold 18px/24px Arial;
  padding-left: 10px;
}

.club-two{
  display: flex;
}

.clubtwo-name{
  font: normal normal bold 18px/24px Arial;
  padding-left: 10px;

}

</style>