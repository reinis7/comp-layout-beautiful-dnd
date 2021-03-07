import _ from 'lodash';
import __ from 'lodash-uuid';
import * as constant from './constants'

import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL } from 'helper/constants'

export const getItems = count => _.range(count).map(_ => genItem());

export const genItem = (type = constant.LINK_LABEL) => {
  const id = genUniqId();

  const newItem = {
    id,
    type,
    isLoading: false,
    content: `item ${id}`,
  }
  switch (type) {
    case IMAGE_LABEL:
      newItem.url = 'https://www.w3schools.com/html/img_chania.jpg';
      break;
    case VIDEO_LABEL:
      newItem.url = 'https://www.w3schools.com/html/mov_bbb.mp4';
      break;
    case LINK_LABEL:
      newItem.url = '';
      newItem.content = 'Link';
      newItem.isLoading = true;
      break;
    case TEXT_LABEL:
      newItem.content = 'Text';
      newItem.h = 1;
      newItem.isLoading = true;
      break;
    case CUSTOM_HTML_LABEL:
      newItem.content = '<p>This is html</p>';
      newItem.isLoading = true;
      break;
    default:
  }

  return newItem;
};

export const genUniqId = _ => __.uuid();
