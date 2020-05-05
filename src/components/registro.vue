<template>
<div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">{{titulo}}</h4>
      </div>
      <div class="modal-body">
        <div v-if="tipo">
          <h5>Matrícula</h5>
          <textarea id="matricula" name="textarea" rows="1" cols="35" required></textarea>
          <h5>Apellido Paterno</h5>
          <textarea id="paterno" name="textarea" rows="1" cols="35" required></textarea>
          <h5>Apellido Materno</h5>
          <textarea id="materno" name="textarea" rows="1" cols="35" required></textarea>
          <h5>Nombre</h5>
          <textarea id="nombre" name="textarea" rows="1" cols="35" required></textarea>
          <h5>Semestre Ingreso</h5>
          <textarea id="semestre" name="textarea" rows="1" cols="35" required></textarea>
          <h5>Creditos Cursados</h5>
          <textarea id="creditos" name="textarea" rows="1" cols="35" required></textarea>
        </div>
        <div v-else>
          <h5>Clave</h5>
          <textarea id="clase" name="textarea" rows="1" cols="35" required></textarea>
          <h5>Nombre</h5>
          <textarea id="nombreCurso" name="textarea" rows="1" cols="35" required></textarea>
          <h5>Creditos</h5>
          <textarea id="creditos" name="textarea" rows="1" cols="35" required></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="entendido">Registrar</button>
        <button type="button" class="btn btn-secondary" @click="cancelado">Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    titulo: String,
    tipo: Boolean
  },
  methods: {
    entendido: function() {
      let aux, direccion;
      if (this.tipo) {
        aux = {
          matricula: document.getElementById("matricula").value,
          aMaterno: document.getElementById("materno").value,
          aPaterno: document.getElementById("paterno").value,
          nombre: document.getElementById("nombre").value,
          semestreIngreso: document.getElementById("semestre").value,
          creditosCursados: document.getElementById("paterno").value
        }
        direccion = "estudiantes";
      } else {
        aux = {
          clave: document.getElementById("clase").value,
          nombre: document.getElementById("nombreCurso").value,
          creditos: document.getElementById("creditos").value,
        }
        direccion = "cursos"
      }
      fetch(`http://localhost:4000/${direccion}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(aux)
        })
        .then(response => {
          return response.text();
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })

      this.$emit('registradoTerminado');
    },
    cancelado: function() {
      this.$emit('cancelarRegistro');
    }
  }
}
</script>

<style scoped>

</style>
