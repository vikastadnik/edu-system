import * as React from 'react';
import { IGroupDTO } from '../../interfaces';
import { Form, InputOnChangeData, Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { GROUP_TEXT, PLACEHOLDERS } from '../../constants';
import { autobind } from 'core-decorators';
import { COURSES } from '../../enums';

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

  /** Convert  data to Semantic UI options */
  public getCoursesOptions(): DropdownItemProps[] {
    const options: DropdownItemProps[] = [];
    for (const value in COURSES) {
      if (typeof COURSES[value] === 'number') {
        options.push({ value: COURSES[value], text: COURSES[value] });
      }
    }
    return options;
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

        <Dropdown
          placeholder={PLACEHOLDERS.SELECT_COURSE}
          label={GROUP_TEXT.COURSE}
          search
          selection
          options={this.getCoursesOptions()}
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
