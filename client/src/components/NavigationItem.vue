<template>
  <li class="menu-items">
    <router-link class="items" :to="to">
      <i :class="`icon-${icon}`"/>{{ text }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    text: String,
    icon: String,
    to: String
  }
}
</script>

<style scoped>

.menu-items {

}

li.menu-items {
  display: flex;
  padding-top: 20px;
  text-align: left;
  font: normal normal bold 16px/23px Arial;
  letter-spacing: 0px;
  color: #0072D5;
  opacity: 1;


}

.items > i {
  margin-right: 10px;
  width: 25px;
  display: inline-block;
  text-align: center;
}

.items {
  color: gray;
  text-decoration: none;


}

.items:hover {
  color: #0072D5;
}

.items:focus {
  color: #0072D5;
}

</style>