<template>
    <div id="main">
        <vFooter> </vFooter>
        <p>activity</p>
    </div>
</template>


<script>
import vFooter from '@/components/footer/vfooter'
export default {
    name:'activity',
    data () {
        return {

        }
    },
    components: {
        vFooter
    }
}
</script>

<style lang="sass">
    #main
        color: red
        font-size: 18px
</style>