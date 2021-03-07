import _ from 'lodash';
import __ from 'lodash-uuid';
import * as constant from './constants'

export const getItems = count => _.range(count).map(_ => genItem());

export const genItem = (type = constant.LINK_LABEL) => {
  const id = genUniqId();
  return {
    id: id,
    content: `item ${id}`,
    type
  }
};

export const genUniqId = _ => __.uuid();
