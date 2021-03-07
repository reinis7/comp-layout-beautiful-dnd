import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

export default function CompProperty() {
  const chooseItem = useSelector(state => state.layout.chooseItem)
  const handleUpdateValue = useCallback((e) => {
  }, [useDispatch]);
  const handleSaveModal = useCallback((e) => {
  }, [useDispatch]);
  const handleCancelModal = useCallback((e) => {
  }, [useDispatch]);



  return (
    <div>
      <PreviewSettingWrapper>
        <PreviewSettingTitle>{chooseItem.type}</PreviewSettingTitle>
        <PreviewSettingSubtitle>[{chooseItem.id}]</PreviewSettingSubtitle >
        <PreviewSettingContent>
          <PreviewSettingPropertySection>
            <strong>ABC</strong>:
            <PreviewSettingInput onChange={handleUpdateValue} />
          </PreviewSettingPropertySection>
        </PreviewSettingContent>
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

