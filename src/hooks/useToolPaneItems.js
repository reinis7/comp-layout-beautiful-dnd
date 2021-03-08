import { useMemo } from 'react'
import {
  LINK_LABEL, TEXT_LABEL, IMAGE_LABEL, VIDEO_LABEL, CUSTOM_HTML_LABEL
} from 'helper/constants'

export default function useToolPaneItems() {
  return useMemo(() => {
    return [
      { id: LINK_LABEL, content: 'Link' },
      { id: TEXT_LABEL, content: 'Text' },
      { id: IMAGE_LABEL, content: 'Image' },
      { id: VIDEO_LABEL, content: 'Video' },
      { id: CUSTOM_HTML_LABEL, content: 'Custom HTML' }
    ]
  }, []);
}
