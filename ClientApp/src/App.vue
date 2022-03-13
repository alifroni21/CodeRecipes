<template>
    <v-app>
        <SnackBar />
        <v-app-bar app
                   color="#29bb89b5"
                   dark>
            <div class="d-flex align-center">
                <v-img alt="Vuetify Logo"
                       class="shrink mr-2"
                       contain
                       src="https://codefood-4e317.web.app/static/media/codefood-logo-white.011f25c1.svg"
                       transition="scale-transition"
                       width="150"
                       @click="$router.push({name:'LISTRecipes'})"/>
            </div>
            <v-spacer></v-spacer>

            <SearchBar v-on:recipe="getRecipe($event)" />
            <!--<input type="text" v-model="search" placeholder="Search" />-->
            <!--<v-autocomplete>

    </v-autocomplete>-->
            <!--<v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest"
           target="_blank"
           text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
    </v-btn>-->
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
    import SearchBar from './components/SearchBar.vue';
    import SnackBar from './components/SnackBar.vue'
    import { mapActions } from 'vuex';
    import axios from 'axios';

    export default {
        name: 'App',
        components: {
            SearchBar,
            SnackBar
        },
        data: () => ({
            //
            search: ''
        }),
        methods: {
            ...mapActions(['setSnackbar', 'setAllRecipe']),
            async getRecipe() {
                await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/recipes`, {
                    validateStatus: function (status) {
                        return status < 500;
                    }
                }).then((response) => {
                    const result = response.data.data;
                    const a = result.recipes.map(item => ({ id: item.id, name: item.name }));
                    this.setAllRecipe(a);
                })
            }
        },
        async mounted() {
            this.getRecipe();
        }
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Saira+Condensed&display=swap');
</style>
