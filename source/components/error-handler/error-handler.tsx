import * as React from 'react';
import { Message } from 'semantic-ui-react';

export const ErrorHandler: React.FunctionComponent<IProps> = ({ error }: IProps) => {
  if (error) {
    return (
      <Message
        negative
        icon={'attention'}
        header={error}
      />
    );
  }
  return null;
};

interface IProps {
  error: string;
}
