import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 博客页的编辑博客
        selfBlogEdit: {}
    },
    mutations: {
        editSee(state, content){
            // content为参数
            state.selfBlogEdit = content
        }
    },
    action: {}
})