<template>
  <div>

    <registro v-if="registroCurso" v-bind:tipo="false"
    @cancelarRegistro="registroCurso=false"
    @registradoTerminado="registroCurso=false, actualizar()"
    titulo="Registro de Cursos">
    </registro>

    <h1 style="text-align: center">Cursos</h1>
    <table id="cursos" class="table table-hover table-bordered ">
      <tr class="bg-primary">
        <th style="text-align: center">Clave</th>
        <th style="text-align: center">Nombre</th>
        <th style="text-align: center">Creditos</th>
        <th style="text-align: center">Estudiantes</th>
        <th style="text-align: center">
          <button title="Agregar Materia" type="button" class="btn btn-info"
           @click="registroCurso=true">
            <span class="glyphicon glyphicon-plus-sign"></span>
          </button>
        </th>
        </tr>
      <tr v-for="(curso) in cursos" class="bg-info" :key="curso.clave">
        <td>{{ curso.clave }}</td>
        <td>{{ curso.nombre }}</td>
        <td>{{ curso.creditos }}</td>
        <td>
          <template v-if="curso.estudiantes.length>0">
            <p v-for="estudiante in curso.estudiantes" :key="estudiante.matricula">
              {{estudiante.matricula}}
            </p>

          </template>

          <template v-else>
            <button title="Dar de baja materia"
            @click="eliminarCurso=true">
              <span class="glyphicon glyphicon-remove-sign"></span>
            </button>
            <alerta v-if="eliminarCurso"
            @entendido="eliminar('cursos',curso.clave), actualizar() "
            @cancelado="eliminarCurso=false">Desea eliminar el curso?</alerta>
          </template>

        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import alerta from './alerta'
  import registro from './registro'

  export default {
    name: "tablaCursos",
    components:{
      alerta,
      registro
    },
    data (){
      return {
        cursos:[],
        registroCurso: false,
        eliminarCurso: false,
        act: true
      }
    },
    methods:{
      almacenarCursos: function(datos){
        let est;
        datos.forEach(item => {
          item["estudiantes"] = [];
          fetch(`http://localhost:4000/cursos/${item.clave}/lista`)
          .then(response => {
            return response.json();
          })
          .then(relacion => {
            relacion.forEach(r => {
              fetch(`http://localhost:4000/estudiantes/${r.matricula_estudiante}`)
              .then(estudiantes => {
                return estudiantes.json();
              })
              .then(estud => {
                item.estudiantes.push(estud);
              })
            });

          })
        });
        this.cursos = datos;
      },
      eliminar: function(tipo,id){
        fetch(`http://localhost:4000/${tipo}/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response=>{return response.text();})
        .then(res =>{console.log(res);})
        .catch(error=>{console.log(error);})

      },
      actualizar: function(){
        location.reload();
      }
    },
    mounted(){
        let aux;
        fetch("http://localhost:4000/cursos")
        .then(response =>{
          return response.json();
        })
        .then(datos =>{
          this.almacenarCursos(datos);
        })
  },
}
</script>

<style scoped>

</style>
