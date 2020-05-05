<template>
<div id="app">
  <div class="container">
    <div class="row">
      <div class="col-md-1">
        <router-link to="/estudiantes">
          Estudiantes
        </router-link>

        <router-link to="/cursos">
          Cursos
        </router-link>
      </div>
      <div class="col-lg-10">
        <router-view>

        </router-view>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
</style>
