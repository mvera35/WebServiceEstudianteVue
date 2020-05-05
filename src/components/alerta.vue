<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{titulo}}</h5>
        </div>
        <div class="modal-body">
          <p><slot></slot></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="entendido">Ok</button>
          <button type="button" class="btn btn-secondary" @click="cancelado">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    props: {
        titulo: String
    },
    methods: {
        entendido: function () {
            this.$emit('entendido');

        },
        cancelado: function () {
            this.$emit('cancelado');

        }
    }
  }
</script>

<style scoped>

</style>
