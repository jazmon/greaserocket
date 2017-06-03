import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Image from 'react-native-image-progress';

const Container = styled.View`
  background-color: #e9e6e6;
  margin: 4 0;
  padding: 4;
  border-radius: 2;
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled(Image)`
  width: 60;
  height: 60;
  margin-right: 8;
`
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

interface Props {
  content: string,
  user: {
    name: string,
    picture: string,
  },
}

const ChatMessage = ({ content, user }: Props) => (
  <Container>
    <View>
      <UserImage
        source={{ uri: user.picture }}
        resizeMode="cover"
      />
    </View>
    <View>
    <UserName>{user.name}</UserName>
    <Content>{content}</Content>
    </View>
  </Container>
);

export default ChatMessage;
