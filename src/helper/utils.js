import _ from 'lodash';
import __ from 'lodash-uuid';


export const getItems = count => _.range(count).map(_ => genItem());

export const genItem = () => {
  const id = genUniqId();
  return {
    id: id,
    content: `item ${id}`
  }
};

export const genUniqId = _ => __.uuid();
