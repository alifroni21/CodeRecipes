<template>
    <div>
        <v-row style="margin-top:20px">
            <v-autocomplete v-model="search"
                            :disabled="isUpdating"
                            :items="getAll"
                            outlined
                            dark
                            dense
                            filled
                            color="cyan"
                            label="Search disini"
                            item-text="name"
                            item-value="id"></v-autocomplete>
            <v-btn style="margin-left:10px; background-color:#EBD671"
                   @click="setSearch()">Cari</v-btn>
            <v-btn style="margin-left:10px; background-color:#EBD671"
                   @click="$router.push({name:'History'})">
                <v-icon light>mdi-history</v-icon>
            </v-btn>
        </v-row>
        
</div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'SearchBar',
        data: () => ({
            recipeId: 0,
            search: null,
            isUpdating: false
        }),
        computed: {
            ...mapGetters(['allRecipe']),
            getAll() {
                return this.allRecipe
            },
            searchData() {
                console.log('asf', this.search)
                return this.search
            }
        },
        methods: {
            ...mapActions(['setIdRecipe']),
            async setSearch() {
                this.setIdRecipe(this.search);
                console.log('deas', this.search);
                this.$router.push({ name: 'RecipeDetail', params: { recipeId: this.search } })
            }
        },
        watch: {
            isUpdating(val) {
                if (val) {
                    setTimeout(() => (this.isUpdating = false), 3000)
                }
            },
        },
        async mounted() {
        }
    }
</script>