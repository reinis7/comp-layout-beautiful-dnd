import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { updateComponent } from 'store/actions'
import _ from 'lodash'

export default function CompProperty() {
  const chooseItem = useSelector(state => state.layout.chooseItem)
  const [comProp, setCompProp] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setCompProp(chooseItem);
  }, [chooseItem])

  const handleSaveModal = useCallback((e) => {
    dispatch(updateComponent(comProp))
  }, [dispatch, comProp]);

  const handleCancelModal = useCallback((e) => {
    setCompProp(chooseItem);
  }, [chooseItem]);

  const handleUpdateValue = useCallback((e) => {
    setCompProp({
      ...comProp,
      [e.target.name]: e.target.value
    });
  }, [comProp]);




  return (
    <div>
      <PreviewSettingWrapper>
        <PreviewSettingTitle>{comProp.type}</PreviewSettingTitle>
        <PreviewSettingSubtitle>[{comProp.id}]</PreviewSettingSubtitle >
        {_.has(comProp, 'url') && (<PreviewSettingContent>
          <PreviewSettingPropertySection>
            <strong>URL</strong>:
            <PreviewSettingInput name='url' onChange={handleUpdateValue} value={comProp.url} />
          </PreviewSettingPropertySection>
        </PreviewSettingContent>)}

        {comProp.content && (<PreviewSettingContent>
          <PreviewSettingPropertySection>
            <strong>CONTENT</strong>:
            <PreviewSettingInput name='content' onChange={handleUpdateValue} value={comProp.content} />
          </PreviewSettingPropertySection>
        </PreviewSettingContent>)}

        <PreviewSettingActioins>
          <CommonButton onClick={handleSaveModal}>Save</CommonButton>
          <CommonButton onClick={handleCancelModal}>restore</CommonButton>
        </PreviewSettingActioins>
      </PreviewSettingWrapper>

    </div>
  )
}
const PreviewSettingWrapper = styled.div`
`;
const PreviewSettingTitle = styled.h3`
  margin: 0.2rem 0;
`;
const PreviewSettingSubtitle = styled.h4`
  margin: 0.25em 0;
`;
const PreviewSettingContent = styled.div`
  margin: 0.25em 0;
`;
const PreviewSettingInput = styled.input`
  margin: 0.25em 0;
  height: 1.5rem;
`;

const PreviewSettingActioins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const PreviewSettingPropertySection = styled.section`
  margin: 0.75em 0;
`;
const CommonButton = styled.button`
padding: 0.25rem 0.75rem;
margin: 0.5rem;
`

