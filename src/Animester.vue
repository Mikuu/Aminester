<template>
  <MainBoard/>
</template>

<script>
import MainBoard from './components/MainBoard.vue'

export default {
  name: 'App',
  components: {
    MainBoard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
