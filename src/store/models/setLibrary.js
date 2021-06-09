/**
 * 设置组件布局
 */

const saveLayout = (data) => {
  localStorage.setItem('layout', JSON.stringify(data))
}

let initData = {
  layoutData: [],
  freedomLayout: [],
  current: {},
  layoutType: 'freedom',
}

if (localStorage.getItem('layout')) {
  initData = JSON.parse(localStorage.getItem('layout'))
}

export default {
  name: "setLibrary",
  state: initData,
  effects: (dispatch) => ({
    editLibrary(payload, rootState) {
    }
  }),
  reducers: {
    add(state, payload) {
      let newState = {}
      if (payload.type === 'flow') {
        newState = {
          ...state,
          layoutData: [
            ...state.layoutData,
            payload
          ],
          current: payload,
        }
      } else {
        newState = {
          ...state,
          freedomLayout: [
            ...state.freedomLayout,
            payload
          ],
          current: payload,
        }
      }
      console.log(newState, 'newState')
      saveLayout(newState)
      return newState
    },
    remove(state, payload) {
      let newState = {}
      if (payload.type === 'flow') {
        const layoutData = state.layoutData.filter(item => item.id !== payload.id)
        newState = {
          ...state,
          layoutData,
          current: {},
        }
      } else {
        const freedomLayout = state.freedomLayout.filter(item => item.id !== payload.id)
        newState = {
          ...state,
          freedomLayout,
          current: {},
        }
      }
      saveLayout(newState)
      return newState
    },
    setActive(state, payload) {
      let current = {}
      if (payload.type === 'flow') {
        current = state.layoutData.filter(item => item.id === payload.id)[0]
      } else {
        current = state.freedomLayout.filter(item => item.id === payload.id)[0]
      }
      return {
        ...state,
        current
      }
    },
    update(state, payload) {
      console.log(payload, 'update')
      let layoutData = []
      let current = {}
      let newState = {}
      if (payload.type === 'flow') {
        layoutData = state.layoutData.map(item => {
          if (item.id === payload.id) {
            item.position = { ...item.position, ...payload.position }
          }
          return item
        })
        current = state.layoutData.filter(item => item.id === payload.id)[0]
        newState = {
          ...state,
          layoutData,
          current,
        }
      } else {
        layoutData = state.freedomLayout.map(item => {
          if (item.id === payload.id) {
            item.position = { ...item.position, ...payload.position }
          }
          return item
        })
        current = state.freedomLayout.filter(item => item.id === payload.id)[0]
        newState = {
          ...state,
          freedomLayout: layoutData,
          current,
        }
      }

      console.log('update modal=>', newState)
      saveLayout(newState)
      return newState
    },
    setting(state, payload) {
      let layoutData = []
      let newState = {}
      
      if (state.current.type === 'flow') {
        layoutData = state.layoutData.map(item => {
          if (item.id === state.current.id) {
            item.position = { ...item.position, ...payload.position }
            item.config = { ...item.config, ...payload.config }
          }
          return item
        })
        newState = {
          ...state,
          current:layoutData[0],
          layoutData
        }
      } else {
        
        layoutData = state.freedomLayout.map(item => {
          if (item.id === state.current.id) {
            item.position = { ...item.position, ...payload.position }
            item.config = { ...item.config, ...payload.config }
          }
          return item
        })
        newState = {
          ...state,
          current:layoutData[0],
          freedomLayout: layoutData
        }
      }

      saveLayout(newState)
      return newState
    },
    setType(state, payload) {
      const newState = {
        ...state,
        layoutType: payload.layoutType
      }
      return newState
    }
  },
};
