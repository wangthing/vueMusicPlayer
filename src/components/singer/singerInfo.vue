<template>
    <div class="singerInfo">
        <div class="top">
            <img src="" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'singerInfo',
    data() {
        return {
            
        }
    },
    components: {

    },
    computed: {

    },
    methods: {

    },
    mounted() {

    },
    beforeEnter: (to, from, next) => {
        console.log(to);
        next (vm => {
            
        }) 

        
    }
}
</script>


<style lang="sass">
    .singerInfo


        .top
            width: 100%
            height: auto
</style>