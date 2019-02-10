import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { COMMON_VIEW_TEXT } from '../../constants';

export const ErrorHandler: React.FunctionComponent<IProps> = ({ error }: IProps) => {
  if (error) {
    return (
      <Message
        negative
        icon={'attention'}
        header={COMMON_VIEW_TEXT.ERROR_TEXT}
        content={error}
      />
    );
  }
  return null;
};

interface IProps {
  error: string;
}
