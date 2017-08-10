import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import Image from 'react-native-image-progress';
import * as _ from 'lodash';
import * as format from 'date-fns/format';
import * as fiLocale from 'date-fns/locale/fi';

const Container = styled.View`
  background-color: #e9e6e6;
  margin: 4px 0px;
  padding: 8px;
  border-radius: 12px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  flex-grow: 1;
  flex: 1;
  justify-content: ${({ alignRight }: { alignRight: boolean }) =>
    alignRight ? 'flex-end' : 'flex-start'};
`;

const UserImage = styled(Image)`
  width: 60px;
  height: 60px;
  margin-right: 8px;
`;
const UserName = styled.Text`
  text-align: left;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Content = styled.Text`
  text-align: left;
  font-size: 14px;
`;

const TextContainer = styled.View`
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DateText = styled.Text`
  font-size: 10px;
  margin-left: 8px;
`;

interface Props {
  message: {
    content: string;
    created_at: string;
    user: {
      name: string;
      user_id: string;
      picture: string;
    };
  };
  showPicture: boolean;
  showDate: boolean;
  userId: string;
}

const formatDate = (date: string): string => {
  const result = format(new Date(date), 'H:m', { locale: fiLocale });
  return result;
};

const ChatMessage: React.StatelessComponent<Props> = ({
  message,
  showPicture,
  showDate,
  userId,
}: Props) =>
  <Wrapper alignRight={userId === message.user.user_id}>
    <Container>
      {showPicture &&
        <View>
          <UserImage
            source={{ uri: message.user.picture }}
            resizeMode="cover"
          />
        </View>}
      <TextContainer>
        <InfoContainer>
          <UserName>
            {message.user.name}
          </UserName>
          {showDate &&
            <DateText>
              {formatDate(message.created_at)}
            </DateText>}
        </InfoContainer>

        <Content>
          {message.content}
        </Content>
      </TextContainer>
    </Container>
  </Wrapper>;

ChatMessage.defaultProps = {
  showPicture: false,
  showDate: true,
};

export default ChatMessage;
