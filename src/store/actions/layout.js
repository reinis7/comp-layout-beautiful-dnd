import _ from 'lodash';
import api from 'helper/api';
import * as types from 'store/types'

//Get all unique userId's from list of posts, iterate over unique userids and fetch user for each userid

export const fetchLayouts = () => async (dispatch) => {

  //Action Creators inside an Action Creator
  // await dispatch(fetchPosts());
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));
};


//Action Creator returning a function using Redux-Thunk
export const saveLayouts = (layouts) => async dispatch => {
  // const response = await jsonPlaceholder.get('/posts');
  dispatch({ type: types.SAVE_ITEMS_LAYOUT_ACTIONS, payload: layouts })
};

export const addItemToLayouts = (item) => async dispatch => {
  // const response = await jsonPlaceholder.get('/posts');
  dispatch({ type: types.ADD_ITEM_TO_LAYOUT_ACTIONS, payload: item })
};

export const removeItemFromLayouts = (id) => async dispatch => {
  // const response = await jsonPlaceholder.get('/posts');
  dispatch({ type: types.REMOVE_ITEM_LAYOUT_ACTIONS, payload: id })
};

export const deleteAllLayouts = () => async dispatch => {
  // const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: types.REMOVE_ITEM_LAYOUT_ACTIONS });
};
// component
export const chooseComponent = (item) => async dispatch => {
  dispatch({ type: types.CHOOSE_COMPONENT_ITEM, payload: item });
};

export const submitCodes = (codelines) => async dispatch => {
  dispatch({ type: types.SUBMIT_CODE_LINES, payload: codelines });
};
