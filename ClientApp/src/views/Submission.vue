<template>
    <div v-if="$vuetify.breakpoint.mobile"
         :style="{'background-image':'url(https://cdn.vuetifyjs.com/images/parallax/material.jpg)'}">
        <br />
        <div>
            <v-alert type="error"
                     :value="alert">
                You are out of area!
            </v-alert>
        </div>
        <v-card class="mx-auto"
                max-width="344"
                outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1">
                        James Rodriguez
                    </v-list-item-title>
                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile
                                    size="80"
                                    color="grey">
                    <v-avatar class="profile"
                              color="grey"
                              size="80"
                              tile>
                        <v-img src="https://pbs.twimg.com/profile_images/512202329601220608/VqscENUA.jpeg"></v-img>
                    </v-avatar>
                </v-list-item-avatar>
            </v-list-item>
        </v-card>
        <div class="text-center mt-5">
            <v-icon style="align-content:center">mdi-history</v-icon><span>Time:</span>
            <h2 class="date" style="font-size:40px">{{ timestamp }}</h2>
        </div>
        <v-card class="mx-auto rounded-lg text-center date mt-5" max-width="200">
            {{ date }}
        </v-card>
        <v-card class="mx-auto rounded-lg text-center date mt-5" max-width="200">
            Status: <span class="status" style="color">Checked In</span>
        </v-card>
        <div class="text-center my-10">
            <v-btn class="mx-auto"
                   fab
                   dark
                   x-large
                   style="height:150px; width:150px"
                   color="white"
                   @click="submit">
                <span class="btn-command"
                      style="color: black;font-family: 'Saira Condensed'; font-size: 40px">Exit</span>
            </v-btn>
        </div>
        <div><v-icon>mdi-map-marker</v-icon> {{ location }}</div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment'

    export default {
        name: 'Input',
        components: {
        },
        data: () => ({
            alert: false,
            start: null,
            watchID: null,
            location: null,
            acc: null,
            timestamp: '',
            area: false
            //format,
        }),
        created() {
            setInterval(() => {
                this.getNow();
            }, 1000)
        },
        computed: {
            date: function () {
                return moment(this.currentDate).format('LL');
            }
        },
        methods: {
            getNow: function () {
                const today = new Date();
                const time = today.getHours() + ":" + ('0'+today.getMinutes()).slice(-2) + ":" + ('0'+today.getSeconds()).slice(-2);
                this.timestamp = time;
            },
            async positionSuccess(position) {
                console.log('position', position)
                let geo = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&zoom=15&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                console.log('geo on location', geo)
                if (geo !== null) {
                    console.log('geo start', geo.data.display_name)
                    this.location = geo.data.display_name;
                    this.acc = position.coords.accuracy;
                }
                if (position.coords.latitude > -6.328320 && position.coords.latitude < -6.327796
                    && position.coords.longitude > 107.115070 && position.coords.longitude < 107.115291) {
                    this.area = true;
                }
                else {
                    this.area = false;
                }
                
            },
            async startWatchPosition() {
                this.watchID = navigator.geolocation.watchPosition(this.positionSuccess);
                console.log('watchId', this.watchID);
            },
            stopWatchPosition() {
                navigator.geolocation.clearWatch(this.watchID);
            },
            calculateDistance(coords1, coords2) {
                console.log('coor', coords1, coords2);
                if (!coords1) {
                    coords1 = { latitude: 0, longitude: 0 };
                }
                if (!coords2) {
                    coords2 = { latitude: 0, longitude: 0 };
                }
                return (2 * 6371000 * Math.asin(Math.sqrt(Math.pow((Math.sin((coords1.latitude * (Math.PI / 180) - coords2.latitude * (Math.PI / 180)) / 2)), 2) + Math.cos(coords1.latitude * (Math.PI / 180)) * Math.cos(coords2.latitude * (Math.PI / 180)) * Math.pow(Math.sin(((coords1.longitude * (Math.PI / 180) - coords2.longitude * (Math.PI / 180)) / 2)), 2))));
            },
            async submit() {
                if (this.area) {
                    //api submit
                    console.log('in area');
                }
                else {
                    this.alert = true;
                    console.log('out of are')
                }
            }
        },
        async mounted() {
            //this.getReasonData();
            this.startWatchPosition();
            console.log(this.location);
        },
    }
</script>
<style>
    .date{
        font-family: "Saira Condensed", helvetica, arial;
        font-size: 25px;
        font-weight: bolder;
    }
</style>
