// @flow
import React from 'react';
import styled from 'styled-components/native';
import PlaceholderComponent from 'components/PlaceholderComponent';

const Container = styled.View`
  height: 120;
  flex: 1;
  flex-direction: row;
  margin-bottom: 8;
  opacity: 0.5;
`;
const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 120;
`;
const MockImage = styled(PlaceholderComponent)`
  width: 100;
  height: 100;
`;
const TextArea = styled.View`
  flex: 1;
  padding: 16;
`;
const MockText = styled(PlaceholderComponent)`
  flex-grow: 0;
  flex-direction: row;
  height: 14;
  padding-top: ${props => (props.upper ? 2 : 0)};
  padding-bottom: 2;
  margin-top: ${props => (props.lower ? 2 : 0)};
`;

const PlaceholderStory = () => (
  <Container>
    <ImageContainer>
      <MockImage />
    </ImageContainer>
    <TextArea>
      <MockText upper />
      <MockText lower />
    </TextArea>
  </Container>
);
export default PlaceholderStory;
