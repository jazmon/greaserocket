// @flow
import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

import type { ReduxState } from 'redux/modules';

type Props = {
  loading: boolean,
  profile: ?Auth0Profile
};

type State = {
  messages: Array<string>,
  text: string
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

const ChatMessage = styled.Text`
  text-align: left;
  font-size: 12;
`;

const InputContainer = styled.View`
  justify-content: flex-end;
`;

const MessageArea = styled.View`
  flex-grow: 1;
`;

class Messages extends Component<*, Props, State> {
  socket: Object;

  static defaultProps = {
    profile: null,
  };

  constructor(props: Props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:9000');
    this.state = {
      messages: [],
      text: '',
    };
    if (this.props.profile) {
      this.onShouldConnect(this.props.profile);
    }
  }

  componentDidMount() {
    this.socket.on('message', this.onReceiveMessage);
    fetch('http://localhost:9000/messages')
      .then(res => res.json())
      .then(json => {
        this.setState({ messages: json.data.map(j => j.content) });
      })
      .catch(err => alert(err.message) || console.error(err.message, err));
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.profile && nextProps.profile) {
      this.onShouldConnect(nextProps.profile);
    }
  }

  onShouldConnect = (profile: Auth0Profile) => {
    console.log('onShouldConnect');
    this.socket.emit('new user', { userId: profile.userId });
  };

  // onReceiveMessage = (messages: Array<string>) => {
  onReceiveMessage = (message: string) => {
    console.log('received message', message);
    this.setState(prevState => ({
      messages: [...prevState.messages, message],
    }));
  };

  sendMessage = () => {
    this.socket.emit('new message', {
      content: this.state.text,
      userId: this.props.profile.userId,
    });
    this.setState(prevState => ({
      text: '',
      // messages: [...prevState.messages, this.state.text]
    }));
  };

  render() {
    const { messages, text } = this.state;
    return (
      <Container>
        <MessageArea>
          <Text>{this.props.profile && this.props.profile.userId}</Text>
          {messages.map((message, i) => <ChatMessage key={i}>{message}</ChatMessage>)}
        </MessageArea>
        <InputContainer>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={txt => this.setState({ text: txt })}
            value={text}
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
