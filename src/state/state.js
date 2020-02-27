export default{
    recommend: null,        //首页推荐全部的
    nowPlaySong:null,       //正在播放的歌曲信息
    recentlyPlayed:[],      //最近播放的列表
    nowPlayGroup:[],        //正在播放的歌单列表
    nowPlayUrl:[],          //正在播放的url，需要单独获取vkey接口才能获取到，
    groupByCategory:[],    //分类歌单
    showLyric: false,       //是否显示歌词页面
    currentTime: 0,
    isStop: false,          //播放器的状态
    audio: null,            //播放器对象，用于全局切换
    // 这是排行榜里面的播放信息
    // 主题渐变配色
    backgroundTheme: [
        {from:[45,45,45], to: [175,175,175]},
        {from:[30,50,80], to: [90,135,210]},
        {from:[55,40,25], to: [190,140,90]},
        {from:[10,10,60], to: [40,40,190]},
        {from:[45,45,60], to: [145,145,190]},
        {from:[7,74,127], to: [25,135,220]},
    ]
}