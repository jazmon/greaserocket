// @flow
import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import styled from 'styled-components/native';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import ChatMessage from 'components/ChatMessage';
import { Dispatch } from 'redux';
import { Auth0Profile } from 'types/auth';
import { Maybe } from 'types';

import { ReduxState } from 'redux/modules';

type User = {
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  picture: string;
  nickname: string;
  userId: string;
};

type Message = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
};

type Props = {
  loading: boolean;
  profile: Maybe<Auth0Profile>;
};

type State = {
  messages: Message[];
  text: string;
  initialMessages: boolean;
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 8px;
  padding: 8px;
`;
const BaseText = styled.Text`
  color: ${({ theme }) => theme.text.colors.primary};
  font-size: 16px;
`;
type Foo = React.ComponentClass<any>;
const List: React.ComponentClass<any> = styled(FlatList)``;

const InputContainer = styled.View`
  justify-content: flex-end;
  display: flex;
  margin-top: 8px;
  flex-direction: row;
`;
const MessageInput = styled.TextInput`
  height: 40px;
  border: 1px solid gray;
  flex-grow: 1;
`;

const MessageArea = styled.View`flex-grow: 1;`;

const extractKey = ({ id }: Message): string => id;

class Messages extends Component<Props, State> {
  socket: {
    emit: (type: string, props?: any) => void;
    on: (type: string, handler: Function) => void;
  };
  list: { scrollToEnd: () => void } | null;

  static defaultProps = {
    profile: null,
  };
  state = {
    messages: [],
    text: '',
    initialMessages: false,
  };

  componentDidMount() {
    this.socket = SocketIOClient('http://localhost:9000');
    this.socket.on('message_emitted', this.onReceiveMessage);
    fetch('http://localhost:9000/v1/messages')
      .then(res => res.json())
      .then((json: { data: Array<Message>; error: boolean }) => {
        console.log('json', json);
        this.setState({ messages: json.data });
      })
      .catch(err => alert(err.message) || console.error(err.message, err));
    if (this.props.profile) {
      this.onShouldConnect(this.props.profile);
    }
    if (this.props.messages) {
      if (this.list) this.list.scrollToEnd();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.profile && nextProps.profile) {
      this.onShouldConnect(nextProps.profile);
    }

    if (nextProps.messages && !this.state.initialMessages) {
      this.setState({ initialMessages: true }, () => {
        if (this.list) this.list.scrollToEnd();
      });
    }
  }

  componentWillUnmount() {
    if (this.props.profile) {
      this.socket.emit('disconnect');
    }
  }

  bindList = (list: Object) => {
    this.list = list;
  };

  onShouldConnect = (profile: Auth0Profile) => {
    this.socket.emit('connection', {
      user_id: profile.userId,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      nickname: profile.nickname,
    });
  };

  // onReceiveMessage = (messages: Array<string>) => {
  onReceiveMessage = (message: Message) => {
    this.setState(
      (prevState: State) => ({
        messages: [...prevState.messages, message],
      }),
      () => {
        if (this.list) this.list.scrollToEnd();
      },
    );
  };

  sendMessage = () => {
    if (!this.props.profile || this.state.text === '') return;
    this.socket.emit('new_message', {
      content: this.state.text,
      user_id: this.props.profile.userId,
    });
    this.setState({
      text: '',
    });
  };

  render() {
    const { messages, text } = this.state;
    const { profile } = this.props;
    console.log('this.state.messages', this.state.messages);
    return (
      <Container>
        <MessageArea>
          {profile &&
            <List
              ref={this.bindList}
              data={messages}
              renderItem={({ item: message }: { item: Message }) =>
                <ChatMessage
                  key={message.id}
                  message={message}
                  userId={profile.userId}
                />}
              keyExtractor={extractKey}
            />}
        </MessageArea>
        <InputContainer>
          <MessageInput
            onChangeText={txt => this.setState({ text: txt })}
            value={text}
            onSubmitEditing={this.sendMessage}
            returnKeyType="send"
          />
          <Button onPress={this.sendMessage} title="Send" />
        </InputContainer>
      </Container>
    );
  }
}

const mapState = ({ user }: ReduxState) => ({
  ...user,
});

const mapDispatchtoProps = (dispatch: Dispatch<ReduxState>) => ({});
export const MessagesComponent = Messages;
export default connect(mapState, mapDispatchtoProps)(Messages);
