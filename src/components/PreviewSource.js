import React, { useState, useEffect } from 'react'
import ReactDOMServer from "react-dom/server"

import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useSelector, useDispatch } from 'react-redux'
import * as pretty from "pretty"

import { submitCodes } from 'store/actions'
import RenderComp from './RenderComp'



export default function PreviewSource() {
	const [codeLines, setCodeLines] = useState('');
	const components = useSelector(state => state.layout.components);
	const dispatch = useDispatch();

	useEffect(() => {
		const cc = pretty(ReactDOMServer.renderToStaticMarkup(
			components.map((item) => (
				<div key={item.id}>
					<RenderComp
						{...item}
					/>
				</div>)
			)))
		setCodeLines(cc);
	}, [components])

	const handleSumbmitCodes = React.useCallback(() => {
		dispatch(submitCodes(codeLines))
	}, [dispatch, codeLines]);

	return (
		<div>
			<SubmitButton onClick={handleSumbmitCodes}> Sumbit</SubmitButton>

			<SyntaxHighlighter
				language="html"
				showLineNumbers={true}
				style={a11yDark}>
				{codeLines}
			</SyntaxHighlighter>
		</div>
	);
}
const SubmitButton = styled.button``