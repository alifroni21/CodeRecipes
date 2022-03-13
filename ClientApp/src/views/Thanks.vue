<template>
    <div style="background-color:white; max-height:max-content">
        <v-container fluid>
            <v-row style="background-color:#cef2e8; font-family: monospace; text-align-last:center">
                <v-col style="padding: 20px 120px">
                    <v-card class="mx-auto">
                        <div style="padding-inline:300px">
                            <v-img src="https://codefood-4e317.web.app/static/media/rating-thanks.e7324ca2.svg" />
                        </div>
                        <v-card-title style="justify-content:center">
                            Terimakasih telah memberikan penilaianmu!
                        </v-card-title>
                        <v-card-actions style="justify-content:center">
                            <v-btn style="margin-top: 15px"
                                   color="#29bb89b5"
                                   @click="backHome()">Kembali Ke Beranda</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'Thank',
        methods: {
            backHome() {
                this.$router.push({ name: 'LISTRecipes' });
            }
        }
    }
</script>
