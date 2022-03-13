<template>
    <div>
        <template>
            <v-container fluid>
                <v-row>
                    <v-btn style="margin-top:20px"
                           fab
                           dark
                           color="cyan"
                           @click="$router.replace({ name: 'RecipeDetail' })">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-col>
                        <v-card class="mx-auto">
                            <v-card-text class="title">Cara Membuat</v-card-text>
                            <v-container fluid style="padding: 30px">
                                <v-row v-for="(item,index) in refreshData" :key="index">
                                    <v-col>
                                        {{item.stepOrder}}.{{item.description}}
                                    </v-col>
                                    <v-col style="max-width: min-content; align-self:center">
                                        <v-btn dark
                                               :disabled="item.isStart"
                                               @click="get(index)"
                                               color="cyan"
                                               v-if="!item.isActive">Selesai</v-btn>
                                        <v-btn disabled v-if="item.isActive">
                                            <v-icon>mdi-check</v-icon>
                                            Done
                                        </v-btn>
                                        <v-btn v-if="isLastStep && index == lastStep"
                                               dark
                                               color="red"
                                               @click="$router.push({name:'Rating', params: { id: currentId}})">
                                            Sajikan Makanan
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-container>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name: 'Step',
        props: {
            recipeId: {
                type: Number,
                default() {
                    return 1
                }
            },
            porsi: {
                type: Number,
                default() {
                    return 1
                }
            }
        },
        data: () => ({
            step: '',
            isActive: false,
            isLastStep: false,
            lastStep: 0,
            indexStep: -1,
            currentId: null,
        }),
        computed: {
            ...mapGetters(['email', 'token']),
            refreshData() {
                //this.step[this.index].isActive = true;
                this.step[this.indexStep];
                return this.step;
            },
            getEmail() {
                return this.email;
            }
        },
        methods: {
            async getStep(recipeId) {
                console.log(this.$router, this.getEmail);
                if (this.getEmail !== null) {
                    await axios.get(`https://fe.runner.api.devcode.biofarma.co.id/recipes/` + recipeId + `/steps`, {
                        validateStatus: function (status) {
                            return status < 500;
                        }
                    }).then((response) => {
                        this.step = response.data.data;
                        this.step.map(obj => { obj.isActive = false, obj.isStart = true });
                        this.get(-1);
                    })
                }
                else {
                    this.$router.push({ name: 'Login' });
                }
            },
            async get(e) {
                this.indexStep = e;
                const config = {
                    headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' }
                };
                if (this.indexStep+1 < this.step.length) {
                    this.step[e + 1].isStart = false;
                    this.step[e].isActive = true;
                    if (e == 0) {
                        console.log('token', this.token, config);
                        await axios.post(`https://fe.runner.api.devcode.biofarma.co.id/serve-histories`, { nServing: this.porsi, recipeId: this.recipeId }, config, {
                            validateStatus: function (status) {
                                return status < 500;
                            }
                        }).then((response) => {
                            if (response.data.message == "Success") {
                                this.currentId = response.data.data.id;
                            }
                        })
                    }
                    else {
                        console.log('idd', this.currentId);
                        await axios.put(`https://fe.runner.api.devcode.biofarma.co.id/serve-histories/` + this.currentId + `/done-step`, { stepOrder: e + 1 }, config)
                            .then((response) => {
                                if (response.data.message == "Success") {
                                    console.log('berhasil put', response);
                                }
                            })
                    }
                }
                this.lastStep = this.step.length - 1;
                console.log('index', e, this.step.length)
                if (e == this.lastStep) {
                    this.step[e].isStart = true;
                    this.step[e].isActive = false;
                    this.isLastStep = true;
                    await axios.put(`https://fe.runner.api.devcode.biofarma.co.id/serve-histories/` + this.currentId + `/done-step`, { stepOrder: e + 1 }, config)
                        .then((response) => {
                            if (response.data.message == "Success") {
                                console.log('berhasil put', response);
                            }
                        })
                }
            }
        },
        async mounted() {
            this.getStep(this.recipeId);
        }
    }
</script>