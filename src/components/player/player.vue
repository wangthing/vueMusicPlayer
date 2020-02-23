<template>
    <div class="player">
        <miniPlayer></miniPlayer>
        <Lyric> </Lyric>
    </div>
</template> 

<script>
import miniPlayer from './miniPlayer'
import Lyric from './lyric'
export default {
    name: 'player',
    data () {

    },
    components: {
        Lyric,
        miniPlayer
    }
}
</script>

