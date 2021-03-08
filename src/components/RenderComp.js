import React from 'react'

import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL } from 'helper/constants'
import parse from "html-react-parser";
import styled from 'styled-components';


export default function RenderComp({ type, selected, ...rest }) {

	const htmlParseOptions = React.useMemo(() => ({
		replace: (domNode) => {
			if (domNode.attribs && domNode.attribs.class === "remove") {
				return <></>;
			}
		}
	}), []);


	switch (type) {
		case VIDEO_LABEL:
			return (
				<>
					<video controls key={rest.url} width="100%">
						<source src={rest.url} type="video/mp4" />
									Your browser does not support the video tag.
					</video>
					{!rest.output && (<VideoWrapper />)}
				</>
			)
		case LINK_LABEL:
			return <a href={rest.url}> {rest.content}</a>
		case TEXT_LABEL:
			return <p>{rest.content}</p>
		case IMAGE_LABEL:
			return <img src={rest.url} alt="IMAGE NOT FOUND" style={{ width: '100%' }} />
		case CUSTOM_HTML_LABEL:
			return parse(rest.content, htmlParseOptions);
		default:
			return <p> New Item</p>
	}
}

// const Image = styled.img`
// 	width: 100%;
// `
// const Video = styled.video`
// 	width: 100%;
// `
const VideoWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`

// const Link = styled.a`
// 	margin: 0.25rem;
// `
// const Text = styled.p`
// `