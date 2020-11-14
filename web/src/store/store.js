import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const state = {
    vwidth: 450,
    imgurl: localStorage.getItem("imgurl1") || 'http://limingsearch.oss-cn-beijing.aliyuncs.com/9a494fd10596fcd971f6ae45cb6d1322.jpg'
}

const getters = {
    gitlcoalimg() {
        // if (state.imgurl!="") {
        //     localStorage.setItem('imgurl1', "")
        // }
        // // console.log(state.imgurl!="")
        // return localStorage.getItem('imgurl1')
    }
}

const mutations = {
    add(state, vwidth) {
        state.vwidth = vwidth
    },
    addimg(state,imgurl1){
        state.imgurl = imgurl1
    } 
}

const actions = {
}
export default new vuex.Store({
    state,
    mutations,
    getters,
    actions
})