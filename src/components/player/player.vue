<template>
    <div class="player" v-if="getNowPlaySong">
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
        return {

        }
    },
    components: {
        Lyric,
        miniPlayer
    },
    computed: {
        showLyric () {
            return this.$store.state.showLyric
        },
        getNowPlaySong () {
            return this.$store.state.nowPlaySong
        }
    }
}
</script>

