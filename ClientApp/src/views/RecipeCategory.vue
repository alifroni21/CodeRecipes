<template>
    <div>
        <template>
            <v-tabs active-class="active">
                <v-tabs-slider color="#29bb89b5"></v-tabs-slider>
                <v-tab @click="getRecipe()">SEMUA</v-tab>
                <v-tab v-for="recipe in recipesCategory" :key="recipe.id" @click="getRecipe(recipe.id)">{{recipe.name}}</v-tab>
            </v-tabs>
        </template>
        <template>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <span>Urutkan: </span>
                        <v-btn @click="recipes.sort((a,b) =>  new Date(b.updatedAt) - new Date(a.updatedAt)); selected = 1"
                               dark
                               :color="selected == 1?'#29bb89b5':'#EBD671' "
                               style="margin-inline: 10px">
                            <span>Terbaru</span>
                        </v-btn>
                        <v-btn @click="recipes.sort((a,b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1:-1));selected = 2"
                               dark
                               :color="selected == 2?'#29bb89b5':'#EBD671' "
                               style="margin-inline: 10px">
                            <span>Urutkan A-Z</span>
                        </v-btn>
                        <v-btn @click="recipes.sort((a,b) => (a.name.toUpperCase() > b.name.toUpperCase() ? -1:1));selected = 3"
                               dark
                               :color="selected == 3?'#29bb89b5':'#EBD671' "
                               style="margin-inline: 10px">
                            <span>Urutkan Z-A</span>
                        </v-btn>
                        <v-btn @click="recipes.sort((a,b) => (a.nReactionLike > b.nReactionLike ? -1:1)); selected = 4"
                               dark
                               :color="selected == 4?'#29bb89b5':'#EBD671' "
                               style="margin-inline: 10px">
                            <span>Urutkan Dari Paling Disukai</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col v-for="recipe in recipes" :key="recipe.id">
                        <v-card class="mx-auto d-flex flex-column" max-width="300" height="400" @click="getDetail(recipe.id)">
                            <v-img :src="recipe.image"
                                   height="200" />
                            <v-card-title>{{recipe.name}}</v-card-title>
                            <v-card-subtitle>{{recipe.recipeCategory.name}}</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-actions style="align-self:end">
                                <v-icon large color="green">mdi-emoticon</v-icon><span>{{recipe.nReactionLike}}</span>
                                <v-icon large color="yellow">mdi-emoticon-neutral</v-icon><span>{{recipe.nReactionNeutral}}</span>
                                <v-icon large color="red">mdi-emoticon-sad</v-icon><span>{{recipe.nReactionDislike}}</span>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </template>
        <!--<v-btn class="mx-auto"
               fab
               dark
               x-large
               style="height:150px; width:150px"
               color="white"
               @click="get">
            <span class="btn-command"
                  style="color: black;font-family: 'Saira Condensed'; font-size: 40px">Get</span>
        </v-btn>
        <v-btn class="mx-auto"
               fab
               dark
               x-large
               style="height:150px; width:150px"
               color="white"
               @click="$router.replace({ path: $route.path, query: { plan: 'private', next: 'mbuh' } })">
            <span class="btn-command"
                  style="color: black;font-family: 'Saira Condensed'; font-size: 40px">Test path</span>
        </v-btn>-->
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name: 'HomeRecipe',
        components: {
        },
        data: () => ({
            recipesCategory: '',
            recipes: '',
            click: true,
            selected: 1
        }),
        computed: {
            ...mapGetters(['email']),
            getEmail() {
                return this.email
            }
        },
        methods: {
            async getCategory() {
                let response = await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/recipe-categories`);
                this.recipesCategory = response.data.data;
                this.getRecipe();
            },
            async getRecipe(catId) {
                let response = await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/recipes`, { params: { categoryId: catId } });
                this.recipes = response.data.data.recipes;
                this.recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                //this.$emit('recipes', this.recipes)
                console.log('login', this.getEmail);
            },
            async getDetail(recipeId) {
                //let response = await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/recipes/ ` + recipeId);
                this.$router.push({ name: 'RecipeDetail', params: { recipeId: recipeId } });
                console.log('detail', recipeId);
            },
            async get(e) {
                console.log('eas', e);
            }
        },
        async mounted() {
            //this.getReasonData();
            this.getCategory();
        },
    }
</script>
<style>
    .active {
        color: #29bb89b5 !important;
        background-color: #ffff !important;
    }
</style>
