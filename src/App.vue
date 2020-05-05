<template>
  <div id="app">
    <tablaEstudiantes/>
    <tablaCursos/>
  </div>
</template>

<script>
import tablaCursos from './components/tablaCursos'
import tablaEstudiantes from './components/tablaEstudiantes'
export default {
  name: 'App',
  components: {
    tablaCursos,
    tablaEstudiantes
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
