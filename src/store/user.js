
import { int2Role } from "@/components/role";

const keyName = 'loginInfo';
let initial = null;
try {
    // localStorage.setItem(keyName, JSON.stringify({
    //     username:"克里斯",
    //     userId:"20373057",
    //     role:0,
    //     avatar: "https://randomuser.me/api/portraits/women/81.jpg",
    //     email: "20373057@buaa.edu.cn"
    // }))
    initial = JSON.parse(localStorage.getItem(keyName));
} catch (e) {
    console.log("Unable to get session data: " + String(e))
}

const user = {
    namespaced: true,
    state: {
        loginInfo: initial,
    },
    mutations: {
        setInfo(state, data) {
          state.loginInfo = data.info
        },
        setName(state, name) {
          state.loginInfo.username = name;
          localStorage.setItem(keyName,JSON.stringify(state.loginInfo));
        },
        setEmail(state, email) {
          state.loginInfo.email = email;
          localStorage.setItem(keyName,JSON.stringify(state.loginInfo));
        },
        setAvatar(state, avatar) {
          state.loginInfo.avatar = avatar;
          localStorage.setItem(keyName,JSON.stringify(state.loginInfo));
        }
    },
    actions: {
        login({ commit }, {info,remember}) {
            commit('setInfo', {info,remember})
            localStorage.setItem(keyName,JSON.stringify(info))
        },
        logout({ commit }) {
            localStorage.removeItem(keyName)
            commit('setInfo', {info: null})
        }
    },
    getters: {
        loggedIn: state => state.loginInfo !== null,
        id: state => state.loginInfo?.userId,
        name: state => state.loginInfo?.username,
        role: state => state.loginInfo? int2Role.find(tmp => tmp.value === state.loginInfo.role).role : null,
        avatar: state => (state.loginInfo && state.loginInfo.avatar) ? state.loginInfo.avatar:"https://randomuser.me/api/portraits/women/81.jpg",
        email: state => state.loginInfo?.email,
    }
}

export default user
