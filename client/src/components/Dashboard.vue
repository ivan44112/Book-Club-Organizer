<template>
    <div class=dashboard>
      <div class="section-top">
        <div class="logo-container">
        <div class="logo-img"></div>
          <form class="search-bar">
            <div class="search">
              <span class="fa fa-search"></span>
              <input type="text" placeholder="Type in to search">
            </div>
            <div class="dropdown">
                <select class="dropdown-menu" v-model="selected">
                  <option disabled value="">Filter</option>
                  <option>Books</option>
                  <option>Videos</option>
                  <option>Clubs</option>
                </select>
              </div>
          </form>
        </div>
        <div class="content-right">
          <div class="join-club">
            <button class="button">Join a Club</button>
          </div>
          <div class="notification-bell">
            <a href="#" class="notification">
              <span class="bell">3</span>
            </a>
          </div>
          <div class="profile-img"></div>
          <div class="profile-name">John Doe</div>
        </div>
      </div>
      <nav class="section-left">
        <ul>
          <li><a class="active" href="#">Dashboard</a> </li>
          <li><a href="#" class="Clubs">Clubs</a> </li>
          <li><a href="#" class="My Books">My Books</a> </li>
          <li><a href="#" class="Messages">Messages</a> </li>
          <li><a href="#" class="Settings">Settings</a> </li>
        </ul>
      </nav>
    </div>

</template>

<script>
export default {
name: "Dashboard",
  data () {
    return {
      selected: ''
    }
  }
}
</script>

<style scoped>
.dashboard{
  margin: 0;
  font-family: Roboto, -apple-system, 'Helvetica Neue', 'Segoe UI', Arial, sans-serif;

  min-height: 100%;

  width: 100%;
  height: auto;

  position: fixed;
  top: 0;
  left: 0;
}

.logo-container{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 50px;
}

.section-top{
  width: 100%;
  height: 90px;
  display: flex;
}

.logo-img{
  width: 146px;
  height: 40px;
  background-image: url("assets/logoNav.png");
}

.search-bar{
  padding-left: 30px;
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
  width: 538px;
  height: 30px;
  text-align: left;
  font: normal normal normal 15px/20px Arial;
  color: #858585;
  opacity: 1;
  border: 1px solid #ACACAC;
  border-radius: 8px 0 0 8px;

}

.search input { text-indent: 32px;}
.search .fa-search {
  position: absolute;
  top: 10px;
  left: 10px;
  background-image: url("assets/searchIcon.svg");
  width: 20px;
  height: 20px;
}


.dropdown-menu{
  font: normal normal normal 14px/11px Arial;
  border-radius: 0 8px 8px 0;
  color: #858585;
  opacity: 1;
  padding-top: 14px;
  padding-right: 5px;
  text-align: center;
  border: 1px solid #ACACAC;
}

.content-right{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 50px;
}
.button{
  position: absolute;
  border: none;
  left: 1180px;
  width: 138px;
  height: 35px;
  top: 30px;
  background: #0072D5  no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  font: normal normal bold 14px/21px Arial;
  color: #FFFFFF;
  cursor: pointer;
}
.notification {
  background-image: url("assets/bell.svg");
  background-repeat: no-repeat;
  text-decoration: none;
  padding: 12px 16px;
  top: 40px;
  position: absolute;
  left: 1380px;
}
.notification .bell {
  position: absolute;
  top: -10px;
  padding: 3px 8px;
  border-radius: 50%;
  background-color: #0072D5;
  color: white;
  font-weight: bold;
}

.profile-img{
  background-image: url("assets/avatar.png");
  width: 42px;
  height: 42px;
  position: absolute;
  left: 1480px;
  cursor: pointer;

}

.profile-name{
  position: absolute;
  font: normal normal bold 18px/24px Arial;
  color: #2B2B2B;
  opacity: 1;
  left: 1550px;
}

.section-left{
  display: flex;
  background: #FFFFFF  no-repeat padding-box;
  opacity: 1;
  border-top:solid  #ece6e6;
}

ul {
  display: inline-block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 225px;
  background: #FFFFFF  no-repeat padding-box;
  opacity: 1;
}

li a {
  display: block;
  color: #0072D5;
  padding: 8px 16px;
  text-decoration: none;
}

.active{
  background-color: #0072D5;
  color: white;
}

li a:hover:not(.active) {
  background-color: #0072D5;
  color: white;
}



</style>