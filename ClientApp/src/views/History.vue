<template>
    <div>
        <template>
            <v-tabs active-class="active">
                <v-tabs-slider color="#29bb89b5"></v-tabs-slider>
                <v-tab @click="getHistory()">SEMUA</v-tab>
                <v-tab v-for="recipe in recipesCategory" :key="recipe.id" @click="getHistory(recipe.id)">{{recipe.name}}</v-tab>
            </v-tabs>
        </template>
        <v-container fluid>
            <v-row style="background-color:#cef2e8; font-family: monospace; text-align-last:center">
                <v-col style="padding: 20px 120px">
                    <v-card class="mx-auto" v-for="history in histories" :key="history.id" style="margin-top:20px">
                        <v-container fluid>
                            <v-row dense>
                                <v-col style="max-width:300px">
                                    <span>{{history.updatedAt}} <br />
                                    {{history.id}}</span>
                                    <v-img :src="history.recipeImage"
                                           contain
                                           rounded
                                           height="300px"
                                           width="300px"/>
                                </v-col>
                                <v-col style="align-self:center">
                                    <v-card-title>
                                        {{history.recipeName}}
                                    </v-card-title>
                                    <v-card-subtitle style="text-align-last:start">
                                        {{history.recipeCategoryName}}
                                    </v-card-subtitle>
                                    <v-card-subtitle style="text-align-last:start">
                                        Porsi: {{history.nServing}}
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-container fluid>
                                    <v-row>
                                        <v-col v-if="history.reaction == 'like'" style="font-weight: bolder; text-transform: uppercase; color:green">
                                            <v-icon style="padding-inline:20px"
                                                    color="green" x-large>
                                                mdi-emoticon
                                            </v-icon>
                                            {{history.reaction}}
                                        </v-col>
                                        <v-col v-if="history.reaction == 'neutral'" style="font-weight: bolder; text-transform: uppercase; color:yellow">
                                            <v-icon style="padding-inline:20px"
                                                    color="yellow" x-large>
                                                mdi-emoticon-neutral
                                            </v-icon>
                                            {{history.reaction}}
                                        </v-col>
                                        <v-col v-if="history.reaction == 'dislike'" style="font-weight: bolder; text-transform: uppercase; color:red">
                                            <v-icon style="padding-inline:20px"
                                                    color="red" x-large>
                                                mdi-emoticon-sad
                                            </v-icon>
                                            {{history.reaction}}
                                        </v-col>
                                        <v-col style="font-weight: bolder; text-transform: uppercase;">
                                            {{history.status}}
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-container>
                        
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name: 'History',
        data: () => ({
            recipesCategory: '',
            histories: ''
        }),
        computed: {
            ...mapGetters(['email', 'token']),
        },
        methods: {
            async getCategory() {
                let response = await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/recipe-categories`);
                this.recipesCategory = response.data.data;
                this.getHistory();
            },
            async getHistory(e) {
                if (this.token == null) {
                    this.$router.push({ name: 'Login' })
                }
                else {
                    const config = {
                        headers: { Authorization: `Bearer ${this.token}` },
                        params: {
                            categoryId: e,
                        }
                    };
                    await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/serve-histories`, config)
                        .then((response) => {
                            if (response.status == 200) {
                                console.log(response);
                                this.histories = response.data.data.history;
                            }
                    })
                }
            }
        },
        async mounted() {
            this.getCategory();
        }
    }
</script>
<style>
    .active {
        color: #29bb89b5 !important;
        background-color: #ffff !important;
    }
</style>