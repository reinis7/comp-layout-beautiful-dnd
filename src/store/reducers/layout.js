import * as types from 'store/types'

const initialState = {
  components: [],
  chooseItem: null,
}


export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_ITEMS_LAYOUT_ACTIONS: {
      return {
        ...state,
        components: action.payload
      }
    }
    case types.CHOOSE_COMPONENT_ITEM: {
      return {
        ...state,
        chooseItem: action.payload
      }
    }
    case types.UPDATE_COMPONENT_ITEM: {
      const item = action.payload;
      return {
        ...state,
        components: state.components.map(_ => _.id != item.id ? _ : item)
      }
    }
    default:
      return state
  }
}