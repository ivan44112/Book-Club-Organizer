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

li.menu-items{
  display: flex;
  font-size: 24px;
  padding-top: 20px;
}

.items{
  color: gray;
  text-decoration: none;
}

.items:hover{
  color: #0072D5;
}

.items:focus{
  color: #0072D5;
}

</style>