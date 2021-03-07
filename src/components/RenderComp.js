import React from 'react'

import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL } from 'helper/constants'
import parse from "html-react-parser";
import styled from 'styled-components';

const VideoWrapper = styled.div`
	display: grid;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`

export default function RenderComp({ type, ...rest }) {

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
					<Video width="100%" height="100%" controls >
						<source src={rest.url} type="video/mp4" />
									Your browser does not support the video tag.
					</Video>
					{rest.output && (<VideoWrapper />)}
				</>
			)
		case LINK_LABEL:
			return <Link href={rest.url}> {rest.label}</Link>
		case TEXT_LABEL:
			return <Text>{rest.content}</Text>
		case IMAGE_LABEL:
			return <Image src={rest.url} alt="IMAGE NOT FOUND" />
		case CUSTOM_HTML_LABEL:
			return parse(rest.content, htmlParseOptions);
		default:
			return <Text> New Item</Text>
	}
}
const Image = styled.img`
	width: 100%;
`
const Video = styled.video`
	width: 100%;
`
const Link = styled.a`
`
const Text = styled.p`
`