<template>
  <div class=dashboard>
    <Navbar/>
    <div class="main-container">
      <nav class="section-left">
        <ul class="menu-items">
          <NavigationItem
              v-for="icon in icons" :key="icon.text" :text="icon.text" :icon="icon.icon" :to="icon.to"
          />
        </ul>
      </nav>
      <router-view></router-view>
    </div>
  </div>


</template>

<script>
import NavigationItem from "@/components/NavigationItem";
import Navbar from "./Navbar";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    NavigationItem
  },
  data() {
    return {
      icons: [{text: 'Dashboard', icon: 'dashboardIcon', to: '/dashboard/dashboardcontent'},
        {text: 'Clubs', icon: 'clubIcon', to: '/dashboard/clubs'},
        {text: 'My Books', icon: 'booksIcon', to: '/dashboard/mybooks'},
        {text: 'Create Club', icon: 'penIcon', to: '/dashboard/createClub'},
      ]
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

.section-left {
  width: 190px;
  height: calc(100vh - 78px);
  border-right: 1px solid #dae0e5;
}

.main-container {
  display: flex;
}

</style>