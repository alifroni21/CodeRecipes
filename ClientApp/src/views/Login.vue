<template>
    <div style="background-color:#29bb89b5; max-height:max-content">
        <v-container fluid>
            <v-row>
                <v-col style="align-self:center">
                    <v-img src="https://codefood-4e317.web.app/static/media/codefood-logo-white.011f25c1.svg" 
                           style="background-color:#67cfab" />
                </v-col>
                <v-col>
                    <v-card class="mx-auto" max-width="500" style="font-family: monospace">
                        <v-card-title style="justify-content:center">Login</v-card-title>
                        <v-card-actions>
                            <v-col>
                                <v-form ref="form"
                                        v-model="valid"
                                        lazy-validation>
                                    <v-text-field v-model="email"
                                                  :rules="[rules.email, rules.required]"
                                                  label="E-mail"
                                                  filled
                                                  color="#29bb89b5"
                                                  required></v-text-field>

                                    <v-text-field v-model="password"
                                                  :rules="[rules.required, rules.length(6)]"
                                                  label="Password"
                                                  type="password"
                                                  counter="6"
                                                  filled
                                                  color="#29bb89b5"
                                                  required></v-text-field>
                                    <v-btn :disabled="!valid"
                                           color="#29bb89"
                                           class="mr-4"
                                           @click="login">
                                        Login
                                    </v-btn>
                                    <v-btn color="#F6ED46"
                                           class="mr-4"
                                           @click="$router.push({name:'LISTRecipes'})">
                                        Lewati Login
                                    </v-btn>
                                </v-form>
                            </v-col>
                            
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';

    export default {
        name: 'Login',
        data: () => ({
            valid: true,
            email: '',
            password: '',
            rules: {
                email: v => /.+@.+\..+/.test(v) || 'Format tidak sesuai',
                length: len => v => (v || '').length >= len || `Password minimal ${len} karakter`,
                required: v => !!v || 'Wajib di-isi',
            },
            try: 0,
            lastTry: 0,
        }),
        computed: {
           
        },
        methods: {
            ...mapActions(['setSnackbar', 'setEmail', 'setToken']),
            async login() {
                let isValid = this.$refs.form.validate();
                if (isValid) {
                    if (new Date().getMinutes() - this.lastTry < 1) {
                        this.try = 0;
                        this.setSnackbar({
                            show: true,
                            color: 'red',
                            text: 'Terlalu banyak percobaan, coba kembali setelah 1 menit',
                            duration: 20000
                        })
                    }
                    else {
                        await axios.post(`https://fe.runner.api.devcode.biofarma.co.id/auth/login `, { username: this.email, password: this.password }, {
                            validateStatus: function (status) {
                                return status < 500;
                            }
                        }).then((response) => {
                            if (response.status == 200) {
                                this.$router.push({ name: 'LISTRecipes' });
                                this.try = 0;
                                this.setEmail(this.email);
                                this.setToken(response.data.data.token);
                            }
                            if (response.status == 401) {
                                this.try += 1;
                                if (this.try < 3) {
                                    this.setSnackbar({
                                        show: true,
                                        color: 'red',
                                        text: 'Email atau password Anda Salah'
                                    })
                                }
                                else {
                                    this.lastTry = new Date().getMinutes();
                                    this.setSnackbar({
                                        show: true,
                                        color: 'red',
                                        text: 'Terlalu banyak percobaan, pastikan data Email dan Password anda benar',
                                        duration: 20000
                                    })
                                }
                            }
                        })
                    }
                }
            },
        }
    }
</script>