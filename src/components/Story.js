// @flow
import React from 'react';

import Image from 'react-native-image-progress';
import styled from 'styled-components/native';
import type { ThemeType } from 'constants/theme';

import type { Story as StoryType } from 'types';

type Props = {
  story: StoryType,
  style?: ?any,
};

const getTextColor = ({
  theme,
  secondary = false,
}: { theme: ThemeType, secondary?: boolean }) =>
  (secondary ? theme.text.colors.secondary : theme.text.colors.primary);

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
  height: 120;
`;
const ImageContainer = styled.View`
  width: 120;
  align-items: center;
  justify-content: center;
`;
const AuthorImage = styled(Image)`
  width: 100;
  height: 100;
`;
const TextArea = styled.View`
  flex: 1;
  padding: 16;
  flex-direction: column;

`;
const BaseText = styled.Text`
  color: ${props => getTextColor(props)};
  font-size: 16;
`;

const Story = ({ story, style }: Props): ElementType => (
  <Container style={style}>
    <ImageContainer>
      <AuthorImage
        source={{ uri: story.author.profilePictureUrl }}
        resizemode="contain"
      />
    </ImageContainer>
    <TextArea>
      <BaseText secondary>{story.author.name}</BaseText>
      <BaseText>{story.text}</BaseText>
    </TextArea>
  </Container>
);

export default Story;
