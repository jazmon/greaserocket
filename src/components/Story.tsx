// @flow
import * as React from 'react';
import { ViewStyle } from 'react-native';

import Image from 'react-native-image-progress';
import styled from 'styled-components/native';
import { ThemeType } from 'constants/theme';
import defaultPicture from 'assets/default_user.png';

import { Story as StoryType, Maybe } from 'types';

interface Props {
  story: StoryType;
  style?: ViewStyle;
}

interface TextColorProps {
  theme: ThemeType;
  secondary?: boolean;
}

const getTextColor = ({ theme, secondary = false }: TextColorProps): string =>
  secondary ? theme.text.colors.secondary : theme.text.colors.primary;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
  height: 120px;
`;
const ImageContainer = styled.View`
  width: 120px;
  align-items: center;
  justify-content: center;
`;
const AuthorImage = styled(Image)`
  width: 100px;
  height: 100px;

`;
const TextArea = styled.View`
  flex: 1;
  padding: 16px;
  flex-direction: column;
`;
const BaseText = styled.Text`
  color: ${(props: { secondary?: boolean; theme: ThemeType }) =>
    getTextColor(props)};
  font-size: 16;
`;

const Story = ({ story, style }: Props): JSX.Element =>
  <Container style={style}>
    <ImageContainer>
      <AuthorImage
        source={
          story.author.picture ? { uri: story.author.picture } : defaultPicture
        }
        resizemode="cover"
      />
    </ImageContainer>
    <TextArea>
      <BaseText secondary>
        {story.author.name}
      </BaseText>
      <BaseText>
        {story.content}
      </BaseText>
    </TextArea>
  </Container>;

export default Story;
