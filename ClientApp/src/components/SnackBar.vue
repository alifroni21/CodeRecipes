<template>
    <v-snackbar v-model="snackbar.show"
                :timeout="snackbar.duration"
                top
                :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white"
                   text
                   v-bind="attrs"
                   @click="snackbarClosed()">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import Vue from "vue";
    import { mapGetters, mapActions } from "vuex";

    export default Vue.extend({
      computed: {
        ...mapGetters(["snackbar"]),
      },
      methods: {
        snackbarClosed() {
          this.resetSnackbar();
        },
        ...mapActions(["resetSnackbar"])
        },
    });
</script>