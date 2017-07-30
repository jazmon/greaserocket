// @flow
import React from 'react';
import styled from 'styled-components/native';
import PlaceholderComponent from 'components/PlaceholderComponent';

const Container = styled.View`
  height: 120px;
  flex: 1;
  flex-direction: row;
  margin-bottom: 8px;
  opacity: 0.5;
`;
const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 120px;
`;
const MockImage = styled(PlaceholderComponent)`
  width: 100px;
  height: 100px;
`;
const TextArea = styled.View`
  flex: 1;
  padding: 16px;
`;

interface MockTextProps {
  upper?: boolean;
  lower?: boolean;
}
const MockText = styled(PlaceholderComponent)`
  flex-grow: 0;
  flex-direction: row;
  height: 14px;
  padding-top: ${(props: MockTextProps) => (props.upper ? 2 : 0)};
  padding-bottom: 2px;
  margin-top: ${(props: MockTextProps) => (props.lower ? 2 : 0)};
`;

const PlaceholderStory = () =>
  <Container>
    <ImageContainer>
      <MockImage />
    </ImageContainer>
    <TextArea>
      <MockText upper />
      <MockText lower />
    </TextArea>
  </Container>;
export default PlaceholderStory;
