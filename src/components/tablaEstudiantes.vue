<template>
  <div>

    <registro v-if="registro" v-bind:tipo="true"
    @cancelarRegistro="registro=false"
    @registradoTerminado="registro=false, actualizar()"
    v-on:registro="false" titulo="Registro de Alumnos">
    </registro>

    <inscribirCurso v-if="inscribir"
    @entendido="inscribirAlumno($event),inscribir=false,actualizar()"
    @cancelado="inscribir=false">
    </inscribirCurso>

    <alerta v-if="bajaCurso"
    @entendido="darBajaCurso(),bajaCurso=false, actualizar()"
    @cancelado="bajaCurso=false">Desea Elimnar?</alerta>

    <h1 style="text-align: center">Estudiantes</h1>
    <table id="estudiantes" class="table table-hover table-bordered ">
      <thead>
        <tr class="bg-primary">
          <th style="text-align: center">Matrícula</th>
          <th style="text-align: center">Apellido Paterno</th>
          <th style="text-align: center">Apellido Materno</th>
          <th style="text-align: center">Nombre(s)</th>
          <th style="text-align: center">Semestre Ingreso</th>
          <th style="text-align: center">Creditos Cursados</th>
          <th style="text-align: center">Cursos Inscritos</th>
          <th style="text-align: center">
            <button title="Agregar alumno" type="button" class="btn btn-info"
            @click="registro=true">
              <span class="glyphicon glyphicon-plus-sign"></span>
            </button>
          </th>
        </tr>
        <tr v-for="(estudiante) in estudiantes" class="info" :key="estudiante.matricula">
          <td >{{ estudiante.matricula }}</td>
          <td>{{ estudiante.aPaterno }}</td>
          <td>{{ estudiante.aMaterno }}</td>
          <td>{{ estudiante.nombre }}</td>
          <td>{{ estudiante.semestreIngreso }}</td>
          <td>{{ estudiante.creditosCursados }}</td>
          <td>
            <button title="Inscribir en curso" type="button"
            @click="inscribir=true,est=estudiante.matricula">
              <span class="glyphicon glyphicon-plus-sign"></span>
            </button>
            <template v-if="estudiante.cursos.length > 0">
              <p v-for="curso in estudiante.cursos" :key="curso.clave">
                {{curso.nombre}}
                <button title="Dar de baja materia"
                 @click="bajaCurso=true,clv=curso,est=estudiante">
                  <span class="glyphicon glyphicon-remove-circle"></span>
                </button>
              </p>
            </template>
            <template v-else>
              <button title="Dar de baja alumno" @click="bajaAlumno=true">
                <span class="glyphicon glyphicon-remove-sign"></span>
              </button>

            <alerta v-if="bajaAlumno"
            @entendido="eliminar('estudiantes',estudiante.matricula), actualizar()"
            @cancelado="bajaAlumno=false">
            Desea eliminar el estudiante?</alerta>
            </template>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
  import alerta from './alerta'
  import registro from './registro'
  import inscribirCurso from './inscribirCurso'
  export default {
    name: "tablaEstudiantes",
    components:{
      alerta,
      registro,
      inscribirCurso
    },
    data (){
      return {
        estudiantes:[],
        registro: false,
        bajaAlumno: false,
        bajaCurso: false,
        clv: 0,
        est: 0,
        inscribir: false
      }
    },
    methods:{
      almacenarDatos: function(datos,relacion){
        let aux
        datos.forEach(item => {
          item["cursos"] = [];
          relacion.forEach(curso => {
            fetch(`http://localhost:4000/cursos/${curso.clave}/lista`)
            .then(response => {
              return response.json();
            })
            .then(rel => {
              rel.forEach(r => {
                if(r.matricula_estudiante == item.matricula){
                  fetch(`http://localhost:4000/cursos/${r.clave_curso}`)
                  .then(res=>{
                    return res.json();
                  })
                  .then(cur => {
                    item.cursos.push(cur);
                  });
                }
              });
            })
          });
        });

        this.estudiantes = datos;
      },
      actualizar: function(){
        location.reload();
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
      inscribirAlumno: function(idcurso){
        fetch(`http://localhost:4000/estudiantes/${this.est}/inscribir/${idcurso}`,{
          method: 'POST',
        })
        .then(response=>{return response.text();})
        .then(res =>{console.log(res);})
        .catch(error=>{console.log(error);})
      },
      darBajaCurso: function(){
        let salir=true,aux,cursoClave;

        fetch(`http://localhost:4000/estudiantes/${this.est.matricula}/inscribir/${this.clv.clave}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response=>{return response.text();})
        .then(res =>{console.log(res);})
        .catch(error=>{console.log(error);})
      }
    },
    mounted(){
      let aux;
      fetch("http://localhost:4000/estudiantes")
      .then(response =>{
        return response.json();
      })
      .then(estudiantes =>{
        fetch("http://localhost:4000/cursos")
        .then(respuesta =>{
          return respuesta.json();
        })
        .then(cursos=>{
          this.almacenarDatos(estudiantes,cursos);
        })
      })
    }
  }
</script>

<style scoped>

</style>
