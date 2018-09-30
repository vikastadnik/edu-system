import * as React from 'react';
import { IGroupDTO } from '../../interfaces';
import { Form, InputOnChangeData } from 'semantic-ui-react';
import { GROUP_TEXT } from '../../constants';
import { autobind } from 'core-decorators';

/**
 * Entry point for "Add or Edit Group Information" form
 */

export class GroupInfoForm extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  @autobind
  public onInputChange(e: object, change: InputOnChangeData): void {
    this.props.onChange({ [change.name]: change.value });
  }

  public render(): JSX.Element {
    return (
      <Form loading={this.props.loading}>
        <Form.Input
          label={GROUP_TEXT.NAME}
          value={this.props.data.name || ''}
          onChange={this.onInputChange}
          name="name"
          type="text"
          required
        />

        <Form.Input
          label={GROUP_TEXT.FACULTY}
          value={this.props.data.faculty || ''}
          onChange={this.onInputChange}
          name="faculty"
          type="text"
          required
        />
      </Form>
    );
  }
}

export interface IProps {
  readonly data: IGroupDTO;
  readonly loading: boolean;

  onChange(data: IGroupDTO): void;
}
