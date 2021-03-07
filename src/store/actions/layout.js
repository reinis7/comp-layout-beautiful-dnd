import _ from 'lodash';
import api from 'helper/api';


//Get all unique userId's from list of posts, iterate over unique userids and fetch user for each userid

export const fetchLayouts = () => async (dispatch, getState) => {

  //Action Creators inside an Action Creator
  // await dispatch(fetchPosts());
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));
};


//Action Creator returning a function using Redux-Thunk
export const saveLayouts = () => async dispatch => {

  // const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data })

};

export const deleteAllLayouts = () => async dispatch => {

  // const response = await jsonPlaceholder.get(`/users/${id}`);
  // dispatch({ type: 'FETCH_USER', payload: response.data });
};
