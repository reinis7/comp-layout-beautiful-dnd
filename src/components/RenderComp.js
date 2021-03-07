import React from 'react'

import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL } from 'helper/constants'
import parse from "html-react-parser";
import styled from 'styled-components';

// const VideoWrapper = styled.div`
// 	display: grid;
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// 	z-index: 10;
// `

export default function RenderComp({ type, ...rest }) {

	const htmlParseOptions = React.useMemo(() => ({
		replace: (domNode) => {
			if (domNode.attribs && domNode.attribs.class === "remove") {
				return <></>;
			}
		}
	}), []);


	let render_comp = '<></>'
	switch (type) {
		case VIDEO_LABEL:
			render_comp =
				<>
					<video width="100%" height="100%" controls >
						<source src={rest.url} type="video/mp4" />
									Your browser does not support the video tag.
					</video>
				</>
			break;
		case LINK_LABEL:
			render_comp = <a href={rest.url}> {rest.label}</a>
			break;
		case TEXT_LABEL:
			render_comp = <p> {rest.content}</p>
			break;

		case IMAGE_LABEL:
			render_comp = <div className="img-wrap"><img src={rest.url} alt="IMAGE NOT FOUND" /></div>
			break;

		case CUSTOM_HTML_LABEL:
			render_comp = parse(rest.content, htmlParseOptions);
			break;
		default:
			render_comp = <span> New Item</span>
	}
	return render_comp;
}