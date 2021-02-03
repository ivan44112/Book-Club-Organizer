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
      <CurrentlyReadingBook/>
      <CurrentlyReadingBook/>
    </div>

  </div>

</template>

<script>
import NavigationItem from "@/components/NavigationItem";
import CurrentlyReadingBook from "@/components/CurrentlyReadingBook";

export default {
  name: "Dashboard",
  components: {
    CurrentlyReadingBook,
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
  position: absolute;
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






</style>