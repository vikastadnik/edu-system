import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { isString } from 'lodash-es';

export const ErrorHandler: React.FunctionComponent<IProps> = ({ error }: IProps) => {
  if (!error) return null;

  const errorMessage = isString(error) ? error : error.response?.data?.message;
  return (
    <Message
      negative
      icon={'attention'}
      header={errorMessage}
    />
  );
};

interface IProps {
  error: any;
}
