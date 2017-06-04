// @flow
import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import styled from 'styled-components/native';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import ChatMessage from 'components/ChatMessage.tsx';

import type { ReduxState } from 'redux/modules';

type User = {
  created_at: string,
  updated_at: string,
  name: string,
  email: string,
  picture: string,
  nickname: string,
  user_id: string
};

type Message = {
  id: string,
  content: string,
  created_at: string,
  updated_at: string,
  user: User
};

type Props = {
  loading: boolean,
  profile: ?Auth0Profile
};

type State = {
  messages: Array<Message>,
  text: string,
  initialMessages: boolean
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 8;
  padding: 8;
`;
const BaseText = styled.Text`
  color: ${({ theme }) => theme.text.colors.primary};
  font-size: 16;
`;

// const ChatMessage = styled.Text`
//   text-align: left;
//   font-size: 12;
// `;

const List = styled.FlatList`


`;

const InputContainer = styled.View`
  justify-content: flex-end;
  display: flex;
  margin-top: 8;
`;

const MessageArea = styled.View`
  flex-grow: 1;
`;

const extractKey = ({ id }: Message) => id;

class Messages extends Component<*, Props, State> {
  socket: Object;
  list: Object;

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
    fetch('http://localhost:9000/messages')
      .then(res => res.json())
      .then((json: { data: Array<Message>, error: boolean }) => {
        console.log('json', json);
        this.setState({ messages: json.data });
      })
      .catch(err => alert(err.message) || console.error(err.message, err));
    if (this.props.profile) {
      this.onShouldConnect(this.props.profile);
    }
    if (this.props.messages) {
      this.list.scrollToEnd();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.profile && nextProps.profile) {
      this.onShouldConnect(nextProps.profile);
    }

    if (nextProps.messages && !this.state.initialMessages) {
      this.setState({ initialMessages: true }, () => this.list.scrollToEnd());
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
      userId: profile.userId,
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
      () => this.list.scrollToEnd()
    );
  };

  sendMessage = () => {
    if (!this.props.profile || this.state.text === '') return;
    this.socket.emit('new_message', {
      content: this.state.text,
      userId: this.props.profile.userId,
    });
    this.setState({
      text: '',
    });
  };

  render() {
    const { messages, text } = this.state;
    console.log('this.state.messages', this.state.messages);
    return (
      <Container>
        <MessageArea>
          <List
            ref={this.bindList}
            data={messages}
            renderItem={({ item: message }: { item: Message }) => (
              <ChatMessage key={message.id} message={message} />
            )}
            keyExtractor={extractKey}
          />
        </MessageArea>
        <InputContainer>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
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

const mapDispatchtoProps = (dispatch: Dispatch) => ({});
export const MessagesComponent = Messages;
export default connect(mapState, mapDispatchtoProps)(Messages);
