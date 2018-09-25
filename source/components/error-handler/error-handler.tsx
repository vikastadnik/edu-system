import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { AxiosError } from 'axios';
import { COMMON_VIEW_TEXT } from '../../constants';
import { autobind } from 'core-decorators';

export class ErrorHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: !!this.props.error
    };
  }

  @autobind
  public onDismiss(): void {
    this.setState({visible: false});
  }

  public render(): JSX.Element {
    if (this.state.visible) {
      return (
        <Message
          negative
          icon={'attention'}
          header={COMMON_VIEW_TEXT.ERROR_TEXT}
          content={this.props.error.message}
          onDismiss={this.onDismiss}
        />
      );
    }
    return null;
  }
}

export interface IProps {
  readonly error: AxiosError;
}

export interface IState {
  readonly visible: boolean;
}
