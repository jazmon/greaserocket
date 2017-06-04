import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Image from 'react-native-image-progress';

const Container = styled.View`
  background-color: #e9e6e6;
  margin: 4 0;
  padding: 8;
  border-radius: 12;
  flex-direction: column;
  align-items: flex-start;
  border: 1 solid green;
  justify-content: flex-start;
  flex-shrink: 1;
`;

const UserImage = styled(Image)`
  width: 60;
  height: 60;
  margin-right: 8;
`;
const UserName = styled.Text`
  text-align: left;
  font-size: 10;
  font-weight: bold;
  margin-bottom: 4;
`;

const Content = styled.Text`
  text-align: left;
  font-size: 14;
`;

const TextContainer = styled.View`
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  border: 1 solid red;
`;

interface Props {
  message: {
    content: string,
    user: {
      name: string,
      picture: string
    }
  },
  picture: boolean
}

const ChatMessage = ({ message, picture }: Props) => (
  <Container>
    {picture &&
      <View>
        <UserImage source={{ uri: message.user.picture }} resizeMode="cover" />
      </View>}
    <TextContainer>
      <UserName>{message.user.name}</UserName>
      <Content>{message.content}</Content>
    </TextContainer>
  </Container>
);

ChatMessage.defaultProps = {
  picture: false,
};

export default ChatMessage;
