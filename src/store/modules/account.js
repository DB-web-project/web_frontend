export default {
  namespaced: true,
  state: {
    user: undefined,
    permissions: null,
    roles: null,
    routesConfig: null,
    id: null,
    email: null,
    preference: null,
    avator: null
  },
  getters: {
    user: state => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
          state.user = JSON.parse(user)
        } catch (e) {
          console.error(e)
        }
      }
      return state.user
    },
    permissions: state => {
      if (!state.permissions) {
        try {
          const permissions = localStorage.getItem(process.env.VUE_APP_PERMISSIONS_KEY)
          state.permissions = JSON.parse(permissions)
          state.permissions = state.permissions ? state.permissions : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.permissions
    },
    roles: state => {
      if (!state.roles) {
        try {
          const roles = localStorage.getItem(process.env.VUE_APP_ROLES_KEY)
          state.roles = JSON.parse(roles)
          state.roles = state.roles ? state.roles : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.roles
    },
    routesConfig: state => {
      if (!state.routesConfig) {
        try {
          const routesConfig = localStorage.getItem(process.env.VUE_APP_ROUTES_KEY)
          state.routesConfig = JSON.parse(routesConfig)
          state.routesConfig = state.routesConfig ? state.routesConfig : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.routesConfig
    },
    id: state => {
      // if (!state.id) {
      //   try {
      //     const id = localStorage.getItem(process.env.VUE_APP_ID_KEY)
      //     state.id = JSON.parse(id)
      //     state.routesConfig = state.routesConfig ? state.routesConfig : []
      //   } catch (e) {
      //     console.error(e.message)
      //   }
      // }
      return state.id
    },
    email: state => {
      return state.email
    },
    preference: state => {
      return state.preference
    },
    avator: state => {
      return state.avator
    },
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
      localStorage.setItem(process.env.VUE_APP_PERMISSIONS_KEY, JSON.stringify(permissions))
    },
    setRoles(state, roles) {
      state.roles = roles
      localStorage.setItem(process.env.VUE_APP_ROLES_KEY, JSON.stringify(roles))
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig
      localStorage.setItem(process.env.VUE_APP_ROUTES_KEY, JSON.stringify(routesConfig))
    },
    setId (state, id) {
      state.id = id
      // localStorage.setItem(process.env.VUE_APP_ID_KEY, JSON.stringify(id))
    },
    setEmail (state, email) {
      state.email = email
      // localStorage.setItem(process.env.VUE_APP_EMAIL_KEY, JSON.stringify(email))
    },
    setPreference (state, preference) {
      state.preference = preference
      // localStorage.setItem(process.env.VUE_APP_PREFERENCE_KEY, JSON.stringify(preference))
    },
    setAvator (state, avator) {
      state.avator = avator
      // localStorage.setItem(process.env.VUE_APP_AVATOR_KEY, JSON.stringify(avator))
    }
  }
}