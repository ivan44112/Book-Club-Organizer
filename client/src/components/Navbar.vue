<template>
  <div class="section-top">
    <div class="logo-container">
      <div class="logo-img">
        <router-link to="/dashboard/dashboardcontent">
          <img src="../assets/logoNav.png"/>
        </router-link>
      </div>
    </div>
    <div class="search-form">
      <form @submit.prevent="search" class="search-bar">
        <div class="search">
          <span v-if="!keyword" class="glass-search"></span>
          <img v-else src="../assets/clear.svg" class="clear-search" v-on:click=clearSearch />
          <input class="search-input" type="text" id="search-text" placeholder="Search books" v-model="keyword">
          <input v-if="keyword" type="submit" value="Search" class="search-button">
        </div>
      </form>
      <div class="books-content" v-if="searchClicked">
        <div class="loading" v-if="loadState === 'loading'"></div>
        <BookList v-if="loadState === 'success'" :books="books" :clearSearch="this.clearSearch"/>
      </div>
    </div>
    <div class="content-right">
      <div class="join-club">
        <router-link to="/dashboard/exploreclubs">
          <button class="button">Join a Club</button>
        </router-link>
      </div>
      <!--
      <div class="notification-bell">
        <a href="#" class="notification">
          <img src="../assets/bell.svg">
          <span class="bell">3</span>
        </a>
      </div>
      -->
      <div class="profile-container" v-on:click="dropdownIsOpen = !dropdownIsOpen">
        <div class="profile-name">
          <!--
          <img class="profile-img" src="../assets/avatar.png"/>
          -->
          <span class="profile-text">{{ user.name }}</span>
          <img class="arrow" src="../assets/arrow.svg" v-bind:class="{rotate: dropdownIsOpen}">
        </div>
        <div class="nav-dropdown" v-bind:class="{toggled: dropdownIsOpen}">
          <router-link to="/settings" class="nav-logo">Account</router-link>
          <a v-on:click=logout class="nav-logo">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from "./BookList";
import axios from "axios";
import {Auth} from "@/services/userServices";

export default {
  name: "Navbar",
  components: {
    BookList
  },
  data() {
    return {
      books: [],
      keyword: '',
      loadState: '',
      dropdownIsOpen:false,
      searchClicked: false,
      user:{}
    }
  },
  methods: {
    search() {
      this.loadState = 'loading'
      axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.keyword}`)
          .then(response => {
            console.log(response.data.items);
            this.books = response.data.items;
            this.loadState = 'success';
            this.searchClicked = true;
          })
    },
    async logout() {
      await Auth.logout();
      this.$router.push('/login');
    },

    clearSearch(){
      this.keyword = "";
      this.searchClicked = false;
    },

    async getUser(){
      let user = JSON.parse(localStorage.getItem("user"))
      try{
        let res = await axios.get('http://localhost:5000/auth/currentUser', {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
        this.user = res.data;
      } catch (err){
        console.log(err)
      }
    }
  },
  mounted(){
    this.getUser()
  }
}
</script>

<style scoped>
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

.search-form {
  display: flex;
  align-items: center;
  position: relative;
}

.search-bar {
  padding-left: 23px;
  display: flex;
}

.search {
  position: relative;
  color: #aaa;
  font-size: 16px;
  display: flex;
}

.search-input {
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
  text-indent: 32px;
}

.search .glass-search {
  position: absolute;
  top: 8px;
  left: 8px;
  background-image: url("../assets/searchIcon.svg");
  width: 20px;
  height: 20px;
}

.search-button{
  cursor: pointer;
  border: none;
  width: 85px;
  background: #0072D5;
  color: #FFFFFF;
  outline: none;
  font-weight: bold;
  border-radius: 0 8px 8px 0;
}

.clear-search{
  position: absolute;
  top: 10px;
  left: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.content-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-right: 50px;
}

.join-club {
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

.button:hover {
  opacity: 0.8;
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

.notification img {
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

.arrow {
  transform: rotate(0);
  transition: 0.1s ease-in;
  align-self: center;
  margin-left: 6px;
  margin-top: 6px;
}
.rotate{
  transform: rotate(90deg) !important;
  transition: 0.1s ease-out;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.profile-container:hover{
  opacity: 0.8;
}

.profile-name {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-text {
  padding-top: 5px;
}

.books-content{
  position: absolute;
  top: 63px;
  left: 24px;
  width: 500px;
  height: 700px;
  overflow: auto;
  background: white;
  z-index: 10;
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.15);
}
.nav-dropdown{
  background: white;
  position: absolute;
  width: 124%;
  top: 55px;
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: 0.2s ease-in;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
}
.nav-dropdown a{
  padding: 13px 0;
  text-decoration: none;
  color: #2B2B2B;
  font-weight: bold;
}
.nav-dropdown a:hover{
  background: #f3f3f3;
}
.toggled{
  top:52px !important;
  transition: 0.2s ease-out;
  opacity: 1 !important;
  visibility: visible !important;
}

</style>