<template>
    <div style="background-color:white; max-height:max-content">
        <v-container fluid>
            <v-row style="background-color:#cef2e8; font-family: monospace; text-align-last:center">
                <v-col style="padding: 20px 120px">
                    <v-card class="mx-auto">
                        <v-card-title style="justify-content:center">Beri Penilaian</v-card-title>
                        <div style="padding-inline:300px">
                            <v-img src="https://codefood-4e317.web.app/static/media/foods-drinks.f5e1292f.svg" />
                        </div>
                        <br />
                        <span>
                            Suka dengan resep dari CodeFood? <br />
                            Bagaimana rasanya?
                        </span>
                        <v-card-actions>
                            <v-container fluid>
                                <v-row style="justify-content:center">
                                    <v-icon @click="setHappy()"
                                            style="padding-inline:20px"
                                            :color="selectedReaction == 1 ? 'green':'grey'" x-large>
                                        mdi-emoticon
                                    </v-icon>
                                    <v-icon @click="setNeutral()"
                                            style="padding-inline:20px"
                                            :color="selectedReaction == 2 ? 'yellow':'grey'" x-large>
                                        mdi-emoticon-neutral
                                    </v-icon>
                                    <v-icon @click="setSad()"
                                            style="padding-inline:20px"
                                            :color="selectedReaction == 3 ? 'red':'grey'" x-large>
                                        mdi-emoticon-sad
                                    </v-icon>
                                </v-row>
                                <v-row style="justify-content:center">
                                    <v-btn style="margin-top: 15px"
                                           color="#29bb89b5"
                                           :disabled="selected"
                                           @click="submit()">Berikan Penilaian</v-btn>
                                </v-row>
                            </v-container>
                            
                        </v-card-actions>
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
        name: 'Rating',
        props: {
            id: {
                type: String,
                default() {
                    return '0000'
                }
            }
        },
        data: () => ({
            clicked: true,
            selectedReaction: 0,
            reaction: '',
            selected: true
        }),
        computed: {
            ...mapGetters(['token'])
        },
        methods: {
            setHappy() {
                this.selectedReaction = 1;
                this.reaction = 'like';
                this.selected = false;
            },
            setNeutral() {
                this.selectedReaction = 2;
                this.reaction = 'neutral';
                this.selected = false;
            },
            setSad() {
                this.selectedReaction = 3;
                this.reaction = 'dislike'
                this.selected = false;
            },
            async submit() {
                const config = {
                    headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' }
                };
                if (this.reaction != '') {
                    await axios.post(`https://fe.runner.api.devcode.biofarma.co.id/serve-histories/` + this.id + `/reaction`, { reaction: this.reaction }, config)
                        .then((response) => {
                            if (response.data.message == "Success") {
                                this.$router.push({ name: 'Thank' });
                            }
                        })
                }
            }
        }
    }
</script>