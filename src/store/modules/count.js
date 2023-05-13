import { getCount,readMessage } from "@/api/message";

const getDefaultState = () => {
    return {
        total: 0,
        likeCount: 0,
        replyCount: 0,
        notificationCount: 0,
        listCount: 0,
    };
};

const state = getDefaultState();

const mutations = {
    setTotal: (state, total)=> {
        state.total = total;
    },
    setLikeCount: (state, likeCount)=> {
        state.likeCount = likeCount;
    },
    setNotificationCount: (state, notificationCount)=> {
        state.notificationCount = notificationCount;
    },
    setListCount: (state, listCount)=> {
        state.listCount = listCount;
    },
    setReplyCount: (state, replyCount)=> {
        state.replyCount = replyCount;
    },
    minusTotal(state,count) {
        state.total -= count;
    },
    minusListCount(state,count) {
        state.listCount -= count;
    },
};

const actions = {
    setState({commit}) {
        return new Promise((resolve, reject) => {
            getCount()
                .then((res) => {
                    const data = res.data;
                    commit('setTotal', data.total);
                    commit('setLikeCount', data.likeCount);
                    commit('setNotificationCount', data.notificationCount);
                    commit('setListCount', data.listCount);
                    commit('setReplyCount', data.replyCount);
                    resolve();
                })
                .catch((error) => {
                    console.log("error: " + error);
                    reject(error);
                });
        });
    },
    updateState({commit},{ type, count }) {
        return new Promise((resolve, reject) => {
            readMessage(type)
                .then((res) => {
                    if(res.code === 20000){
                        switch (type) {
                            case "like":
                                commit('minusTotal',state.likeCount)
                                commit('setLikeCount', 0)
                                break;
                            case "system":
                                commit('minusTotal',state.notificationCount)
                                commit('setNotificationCount', 0)
                                break;
                            case "message":
                                commit('minusTotal',count)
                                commit('minusListCount', count)
                                break;
                            case "reply":
                                commit('minusTotal',state.replyCount)
                                commit('setReplyCount', 0)
                                break;
                            default:
                                break;
                        }
                    }
                    resolve();
                })
                .catch((error) => {
                    console.log("error: " + error);
                    reject(error);
                });
        });
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};
