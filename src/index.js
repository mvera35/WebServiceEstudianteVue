import Vue from 'vue'
import VueRouter from 'vue-router'

import tablaEstudiantes from './components/tablaEstudiantes'
import tablaCursos from './components/tablaCursos'

Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        {
          path: '/estudiantes',
          name: 'estudiantes',
          component: tablaEstudiantes
        },
        {
          path: '/cursos',
          name: 'cursos',
          component: tablaCursos
        }
    ]
})
