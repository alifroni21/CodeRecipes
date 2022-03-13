<template>
    <div>
        <template>
            <v-container fluid>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn style="margin-top:20px"
                           fab
                          dark
                          color="cyan"
                           @click="$router.replace({ name: 'LISTRecipes' })">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-col>
                        <v-card class="mx-auto" max-width="500">
                            <v-img :src="recipeDetail.image"
                                   height="400" />
                            <v-card-title>{{recipeDetail.name}}</v-card-title>
                            <v-card-actions style="align-self:end">
                                <v-chip class="reaction">
                                    <v-icon medium color="green">mdi-emoticon</v-icon>
                                    <span>{{recipeDetail.nReactionLike}}</span>
                                </v-chip>
                                <v-chip class="reaction">
                                    <v-icon medium color="yellow">mdi-emoticon-neutral</v-icon>
                                    <span>{{recipeDetail.nReactionNeutral}}</span>
                                </v-chip>
                                <v-chip class="reaction">
                                    <v-icon medium color="red">mdi-emoticon-sad</v-icon>
                                    <span>{{recipeDetail.nReactionDislike}}</span>
                                </v-chip>
                            </v-card-actions>
                            <v-divider></v-divider>
                            <v-card-text class="title">Bahan-Bahan</v-card-text>
                            <v-container fluid style="padding: 15px">
                                <v-row v-for="(item,index) in calcBahan" :key="index">
                                    <v-col style="padding: 6px">
                                        <v-card-text style="padding: 4px">
                                            <span style="font-weight: bolder">{{item.value}} {{item.unit}}</span><span> {{item.item}} </span>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-container>

                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card max-width="350">
                            <v-card-title>Porsi yang dimasak:</v-card-title>
                            <v-card-actions>
                                <v-container fluid>
                                        <v-text-field v-model="numberValue"
                                                      dense
                                                      outlined
                                                      style="text-align-last:center"
                                                      type="number" />

                                       <div style="text-align-last:center" >
                                           <v-btn color="cyan" 
                                                  dark
                                                  @click="$router.push({name:'RecipeStep',params:{ recipeId: recipeId, porsi: numberValue}})">Mulai</v-btn>
                                       </div> 
                                </v-container>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-container>
        </template>
        <!--<template>
            <v-container fluid>
                <v-row dense>
                    <v-col>
                        <v-card class="mx-auto d-flex flex-column" max-width="500">
                            <v-img :src="recipe.image"
                                   height="200" />
                            <v-card-title>{{recipeDetail}}</v-card-title>
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
        </template>-->
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';

    export default {
        name: 'Detail',
        components: {
        },
        props: {
            recipeId: {
                type: Number,
                default() {
                    return 1
                }
            }
        },
        data: () => ({
            recipeDetail: '',
            numberValue: 1,
            initialDetail: ''
        }),
        computed: {
            calcBahan() {
                const multiplier = this.numberValue / this.recipeDetail.nServing;
                return {
                    ...this.recipeDetail.ingredientsPerServing.map(item => ({ value: item.value * multiplier, item: item.item, unit: item.unit }))
                }
            }
        },
        methods: {
            ...mapActions(['setSnackbar']),
            async getDetail(recipeId) {
                await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/recipes/ ` + recipeId, {
                    validateStatus: function (status) {
                        return status < 500;
                    }
                }).then((response) => {
                    console.log('res', response);
                    if (response.status == 200) {
                        this.initialDetail = response.data.data;
                        this.recipeDetail = response.data.data;
                    }
                    else {
                        this.setSnackbar({
                            show: true,
                            color: 'red',
                            text: response.data.message
                        })
                    }
                });
            },
        },
        async mounted() {
            this.getDetail(this.recipeId);
        },
    }
</script>
<style>
    .title {
        font-family: "Saira Condensed", helvetica, arial;
        font-size: 25px;
        font-weight: bolder;
        color: black !important;
    }
    .reaction {
        background-color: white !important;
        border-style: groove !important;
    }
</style>
