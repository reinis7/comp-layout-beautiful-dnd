import { useMemo } from 'react'
import {
  LINK_LABEL, TEXT_LABEL, IMAGE_LABEL, VIDEO_LABEL, CUSTOM_HTML_LABEL
} from 'helper/constants'

export default function useToolPaneItems() {
  return useMemo(() => {
    return [
      { id: LINK_LABEL, content: LINK_LABEL },
      { id: TEXT_LABEL, content: TEXT_LABEL },
      { id: IMAGE_LABEL, content: IMAGE_LABEL },
      { id: VIDEO_LABEL, content: VIDEO_LABEL },
      { id: CUSTOM_HTML_LABEL, content: CUSTOM_HTML_LABEL }
    ]
  }, []);
}
