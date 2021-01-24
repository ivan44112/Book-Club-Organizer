<template>
  <div class=dashboard>
    <div class="section-top">
      <div class="logo-container">
        <div class="logo-img">
          <img src="../assets/logoNav.png"/>
        </div>
      </div>
      <div class="search-form">
        <form class="search-bar">
          <div class="search">
            <span class="glass-search"></span>
            <input type="text" id="search-text" placeholder="Type in to search">
            <label for="search-text"></label>
          </div>
        </form>
      </div>
      <div class="content-right">
        <div class="join-club">
          <button class="button">Join a Club</button>
        </div>
        <div class="notification-bell">
          <a href="#" class="notification">
            <img src="../assets/bell.svg">
            <span class="bell">3</span>
          </a>
        </div>
        <div class="profile-container">
          <div class="profile-name"><img class="profile-img" src="../assets/avatar.png"/>
            <span class="profile-text">John Doe</span>
            <img class="arrow" src="../assets/arrow.svg"></div>
        </div>
      </div>
    </div>
    <nav class="section-left">
      <ul class="menu-items">
        <NavigationItem
            v-for="icon in icons" :key="icon.text" :text="icon.text" :icon="icon.icon" :to="icon.to"
        />
      </ul>
    </nav>
    <div class="content-middle">
      <div class="title-container">
        <h1 class="title-blue">Currently Reading Books</h1>
      </div>
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
          <div class="average-member">Average member page:
            <span class="page-number">548</span>
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
    </div>
  </div>

</template>

<script>
import NavigationItem from "@/components/NavigationItem";

export default {
  name: "Dashboard",
  components: {
    NavigationItem
  },
  data() {

    return {
      icons: [{text: 'Dashboard', icon: 'dashboardIcon', to:'/dashboard'},
        {text: 'Clubs', icon: 'clubIcon' , to:'/dashboard/clubs'},
        {text: 'My Books', icon: 'booksIcon' , to:'/dashboard/mybooks'},
        {text: 'Messages', icon: 'messagesIcon' , to:'/dashboard/messages'},
        {text: 'Settings', icon: 'settingsIcon' , to:'/dashboard/settings'},
      ],
    }
  }
}
</script>

<style scoped>
.dashboard {
  margin: 0;
  font-family: Roboto, -apple-system, 'Helvetica Neue', 'Segoe UI', Arial, sans-serif;

  min-height: 100%;

  width: 100%;
  height: auto;
  overflow-x: hidden;
}

.logo-container {
  display: flex;
  align-items: center;
  width: 190px;
  padding-left: 20px;
}

.section-top {
  width: 100%;
  height: 76px;
  display: flex;
  border: 1px solid #dae0e5;

}

.logo-img {
  width: 146px;
  height: 40px;
}

.search-form{
  display: flex;
  align-items: center;
}

.search-bar {
  padding-left: 23px;
  display: flex;
}

.search {
  position: relative;
  color: #aaa;
  font-size: 16px;
}

.search input {
  top: 14px;
  left: 241px;
  width: 330px;
  height: 30px;
  text-align: left;
  font: normal normal normal 15px/20px Arial;
  color: #858585;
  opacity: 1;
  border: 1px solid #ACACAC;
  border-radius: 8px 0 0 8px;
  outline: none;
}

.search input {
  text-indent: 32px;
}

.search .glass-search {
  position: absolute;
  top: 10px;
  left: 10px;
  background-image: url("../assets/searchIcon.svg");
  width: 20px;
  height: 20px;
}

.content-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-right: 50px;
}

.join-club{
  padding-right: 20px;
}

.button {
  border: none;
  width: 138px;
  height: 35px;
  background: #0072D5;
  border-radius: 6px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}


.notification-bell {
  padding: 12px 31px;
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notification img{
  padding-right: 28px;
}

.notification .bell {
  padding: 2px 7px;
  position: absolute;
  border-radius: 50%;
  background-color: #0072d5;
  color: white;
  font-weight: bold;
  left: 45px;
  top: 30px;
}

.profile-img {
  width: 42px;
  height: 42px;
  cursor: pointer;
  padding-right: 30px;
  padding-top: 10px;
}

.profile-name {
  font: normal normal bold 18px/24px Arial;
  color: #2B2B2B;
  opacity: 1;
}
.arrow{
  padding-left: 8px;
  padding-top: 6px;
}

.section-left {
  position: fixed;
  width: 190px;
  height: 100%;
  border-right: 1px solid #dae0e5;
}

.profile-container{
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-name{
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-text{
  padding-top: 5px;
}

.content-middle{
  position: fixed;
  width: calc(100% - 190px);
  left: 190px;
  margin-left: 1px;

}

.title-container{
  width: 100%;
  left: 190px;
  display: flex;
  justify-content: flex-start;
  background-color: #f7f9fd;

}

.title-blue{
  border: none;
  color: #0072D5;
  outline: none;
  font: normal normal bold 20px/26px Arial;
  padding-left: 30px;

}

.kings-container{
  position: fixed;
  width: 100%;
  display: flex;
  padding-top: 50px;
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
  border: 1px solid green;
  position: relative;
  font: normal normal normal 14px/19px Arial;
  letter-spacing: 0;
  color: #727272;
  opacity: 1;
  /*padding-top: 30px;*/

}
.page-number{
  font: normal normal bold 14px/19px Arial;
  color: #109A3D;

}

.average-percent{
  position: absolute;
  width: 50%;
  left: 0;
  top: 0;
  bottom: 0;
  background: green;
  text-align: center;
  border-radius: 8px;
}

.avg-percent{
  /*background: linear-gradient(to right, green,white);*/
  border-radius: 8px;
  color: white;
  display: inline-block;
  text-align: center;
}

.current-page{
  font: normal normal normal 14px/19px Arial;
  letter-spacing: 0;
  color: #727272;
  opacity: 1;
  padding-top: 20px;

}
.current-number{
  font: normal normal bold 14px/19px Arial;
  color: #0072D5;
  opacity: 1;

}

.curr-percent{
  width: 1000px;
  background: linear-gradient(to right, #0072D5,white);
  border-radius: 8px;
  color: #0072D5;
  display: inline-block;
  text-align: center;
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