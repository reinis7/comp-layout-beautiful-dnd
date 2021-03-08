import { useMemo } from 'react'
import uuid from 'lodash-uuid'
import {
  LINK_LABEL, TEXT_LABEL, IMAGE_LABEL, VIDEO_LABEL, CUSTOM_HTML_LABEL
} from 'helper/constants'

export default function useToolPaneItems() {
  return useMemo(() => {
    return [
      { id: uuid.uuid(), type: LINK_LABEL, content: 'Link' },
      { id: uuid.uuid(), type: TEXT_LABEL, content: 'Text' },
      { id: uuid.uuid(), type: IMAGE_LABEL, content: 'Image' },
      { id: uuid.uuid(), type: VIDEO_LABEL, content: 'Video' },
      { id: uuid.uuid(), type: CUSTOM_HTML_LABEL, content: 'Custom HTML' }
    ]
  }, []);
}
