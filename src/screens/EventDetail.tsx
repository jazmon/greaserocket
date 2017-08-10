// @flow
import * as React from 'react';
import styled from 'styled-components/native';
import { ThemeType } from 'constants/theme';

type Props = {
  navigation: Object;
  route: Object;
  loading: boolean;
};

type State = {
  text: string;
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
`;
const BaseText = styled.Text`
  color: ${({ theme }: { theme: ThemeType }) => theme.text.colors.primary};
  font-size: 16px;
`;

class EventDetail extends React.Component<Props, State> {
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'EventDetail',
    };
  }

  state: State;

  render() {
    const { text } = this.state;
    return (
      <Container>
        <BaseText>
          {text}
        </BaseText>
      </Container>
    );
  }
}

export const EventDetailComponent = EventDetail;
export default EventDetail;
