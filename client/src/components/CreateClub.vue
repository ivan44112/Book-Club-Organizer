<template>
<div class="create-club-container">
  <div class="title-container">
    <h1 class="title-blue" v-on:click="asd">Create Book Club</h1>
  </div>
  <div class="form-container">
    <form v-on:submit.prevent="createClub()">
      <div class="form-item">
        <label for="clubName">Club Name:</label>
        <input type="text" name="clubName" id="clubName" v-model="formData.clubName" required>
      </div>
      <div class="form-item club-desc">
        <label for="clubDescription">Club Description:</label>
        <textarea name="clubDescription" id="clubDescription" v-model="formData.clubDescription"/>
      </div>
      <div class="checkbox-container">
        <div class="checkbox-item" v-for="category in categories"  :key="category">
          <input type="checkbox" :id="category" :value=category v-model="formData.clubCategories"/>
          <label class="checkbox-label" :for="category">{{category}}</label>
        </div>
      </div>
      <div class="form-item">
        <label for="clubImage">Cover Image:</label>
        <input type="file" name="clubImage" id="clubImage" v-on:change="onFileSelected"/>
      </div>
      <div class="form-item">
        <input class="create-button" type="submit" value="Create Club"/>
      </div>
    </form>
  </div>
</div>
</template>

<script>


import axios from "axios";

export default {
  name: "CreateClub",
  components: {},
  data() {
    return{
      categories: ["Adventure", "Horror", "Biography", "Action", "Fantasy"],
      formData:{
        clubName:"",
        clubDescription:"",
        clubCategories:[],
        clubCover:null
      },
      clubCreated:false
    }
  },
  methods:{
    onFileSelected(event){
      this.formData.clubCover = event.target.files[0]
    },
    async createClub(){
      let data = {
        name: this.formData.clubName,
        description: this.formData.clubDescription,
        category: this.formData.clubCategories.join(',')
      }
      let user = JSON.parse(localStorage.getItem("user"))
      try{
          await axios.post('http://localhost:5000/clubs/createClub', data, {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
        this.clubCreated = true;
        await this.$router.push('/dashboard/exploreclubs');
      } catch (err){
        console.log(err)
      }
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
    },
    asd(){

    }
  }
}
</script>

<style scoped>
.create-club-container{
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

.form-container{
  display: flex;
  justify-content: flex-start;
  padding: 30px 0 0 30px;
}

.form-item{
  display: flex;
  padding: 20px 0;
}
.form-item label{
  margin-right: 10px;
  color:#676767;
}
.form-container form input{
  color:#676767;
  border:none;
  border-bottom: 1px solid #707070;
  outline: none;
}
.form-container form textarea{
  color:#676767;
  outline:0;
  resize: none;
  width: 300px;
  padding: 5px;
  height:60px;
}
.create-button{
  width:120px;
  background:#0072D5;
  border:none;
  color:white !important;
  font-weight: bold;
  height:34px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
}
.checkbox-label{
  margin-left: 5px;
}
.checkbox-item{
  padding:4px 0;
}
.checkbox-container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.club-desc{
  flex-direction: column;
  align-items: flex-start;
}
.club-desc label{
  margin-bottom: 10px;
}
</style>