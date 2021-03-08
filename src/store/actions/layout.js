import _ from 'lodash';
import api from 'helper/api';
import * as types from 'store/types'

//Get all unique userId's from list of posts, iterate over unique userids and fetch user for each userid
const LAYOUT_API_URL = `/api/layout`;
const layoutAPI = {
  get: (props = {}) => api.get(LAYOUT_API_URL, props),
  post: (props = {}) => api.post(LAYOUT_API_URL, props),
  delete: (props = {}) => api.delete(LAYOUT_API_URL, props)
}



export const fetchLayoutItems = () => async (dispatch) => {
  const items = await layoutAPI.get();
  dispatch({ type: types.UPDATE_ITEMS_LAYOUT_ACTIONS, payload: items.data })
};

//Action Creator returning a function using Redux-Thunk
export const saveLayouts = (layouts) => async dispatch => {
  await dispatch({ type: types.UPDATE_ITEMS_LAYOUT_ACTIONS, payload: layouts })
  await dispatch(saveToServer());
};

export const saveToServer = () => async (dispatch, getState) => {
  const states = await getState();
  const components = states.layout.components;
  layoutAPI.post(components);
}

export const removeItemFromLayouts = (id) => async dispatch => {
  const res = await dispatch({ type: types.REMOVE_ITEM_LAYOUT_ACTIONS, payload: id })
  await dispatch(saveToServer());
};

export const deleteAllLayouts = () => async dispatch => {
  // unselect choose item
  await dispatch(chooseComponent(null));
  //  remove items
  await dispatch({ type: types.REMOVE_ITEM_LAYOUT_ACTIONS });
  // save to the server
  await dispatch(saveToServer());
};
// component
export const chooseComponent = (item) => async dispatch => {
  dispatch({ type: types.CHOOSE_COMPONENT_ITEM, payload: item });
};
export const updateComponent = (item) => async dispatch => {
  await dispatch({ type: types.UPDATE_COMPONENT_ITEM, payload: item });
  dispatch(chooseComponent(null));
};




//  code submit
export const submitCodes = (codelines) => async dispatch => {
  dispatch({ type: types.SUBMIT_CODE_LINES, payload: codelines });
};
