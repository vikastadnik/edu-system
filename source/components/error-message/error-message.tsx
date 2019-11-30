import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { AxiosError } from 'axios';

export const ErrorMessage: React.FunctionComponent<IProps> = (props: IProps) => {
  if (!props.error) {
    return null;
  }
  const errorMessage: string = typeof props.error === 'string' ? props.error : props.error.message;
  return (
    <Message
      negative
      icon={'attention'}
      header={errorMessage}
    />
  );
};

interface IProps {
  error: AxiosError | string;
}
