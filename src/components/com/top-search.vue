<template>
    <div id="main">
        <div class="wrap">
            <span class="tag">音乐馆</span>
            <div class="search" >
                <i class="iconfont icon-sousuo"></i>
                <input type="text" placeholder="火红的萨日朗">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'top-search',
    data() {
        return {
            
        }
    },
}
</script>

<style lang="sass">
    #main
        .wrap
            display: flex;
            justify-content: space-between;
            height: 3.2rem;
            align-items: center;
            // width: auto;
            .tag
                font-size: 2rem;
                line-height: 1.2;
                font-weight: bold;
                color: black;
            .search
                
                padding: 0 1rem;
                background-color: white;
                line-height: 1.4;
                font-size: 1.4rem;
                margin-left: 0.8rem;     
                height: 3rem; 
                border-radius: 1.2rem;
                $color: #31c27c;
                flex: 1;
                
                input
                    line-height: 3rem;
                    font-size: 1.4rem;
                    outline: none;
                    vertical-align: middle;
                    &:placeholder
                        color: $color;

</style>