<template>

    <div class="content-middle">
      <div class="title-container">
        <h1 class="title-blue">Currently Reading Books</h1>
      </div>
      <div class=readingbooks-container>
        <CurrentlyReadingBook/>
        <CurrentlyReadingBook/>
      </div>
      <div class="news-container">
        <h1 class="news-blue">News from your clubs</h1>
      </div>
      <div class="no-news">There are currently no news</div>
      <div class="upcoming-books">Upcoming Books</div>
    </div>



</template>


<script>
import CurrentlyReadingBook from "@/components/CurrentlyReadingBook";

export default {
  name: "DashboardContent",
  components: {
    CurrentlyReadingBook
  }
}


</script>

<style scoped>


.dashboard-content{

}

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
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  padding-top: 25px;
  padding-left: 30px;
  background-color: #f7f9fd;
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;

}


</style>