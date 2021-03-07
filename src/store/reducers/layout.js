import * as types from 'store/types'
import * as utils from 'helper/utils'

const initialState = {
  components: [],
  compoTypes: utils.getItems(5),
  chooseItem: null,
}


export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ITEM_TO_LAYOUT_ACTIONS: {
      return {
        ...state,
        components: state.components.map((item) => item).concat(action.payload)
      }
    }
    case types.SAVE_ITEMS_LAYOUT_ACTIONS: {
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

    default:
      return state
  }
}