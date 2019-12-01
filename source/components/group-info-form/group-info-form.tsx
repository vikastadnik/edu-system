import * as React from 'react';
import { IGroupDTO, ISpecialityDTO } from '../../interfaces';
import { Form, InputOnChangeData, Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { GROUP_TEXT, PLACEHOLDERS } from '../../constants';
import { autobind } from 'core-decorators';
import { COURSES } from '../../enums';

/**
 * Entry point for "Add or Edit Group Information" form
 */

export class GroupInfoForm extends React.Component<IProps> {

  @autobind
  public onInputChange(e: object, change: InputOnChangeData): void {
    this.props.onChange({ [change.name]: change.value });
  }

  @autobind
  public onDropDownChange(e: object, change: any): void {
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

  /** Convert  data to Semantic UI options */
  @autobind
  public getSpecialitiesOptions(): DropdownItemProps[] {
    return this.props.specialities.map((speciality: ISpecialityDTO) => {
      return { value: speciality.uuid, text: speciality.name };
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <Form.Input
          label={GROUP_TEXT.NAME}
          value={this.props?.data?.name || ''}
          onChange={this.onInputChange}
          name="name"
          type="text"
          required
        />
        <Form.Group widths="equal">
          <Form.Field>
            <label>Курс</label>
            <Dropdown
              placeholder={PLACEHOLDERS.SELECT_COURSE}
              name="course"
              label={GROUP_TEXT.COURSE}
              search
              selection
              options={this.getCoursesOptions()}
              onChange={this.onDropDownChange}
              required
              fluid
            />
          </Form.Field>

          <Form.Field>
            <label>Спеціальність</label>
            <Dropdown
              placeholder={PLACEHOLDERS.SELECT_SPECIALITY}
              label={GROUP_TEXT.COURSE}
              name="specialtyUuid"
              search
              selection
              options={this.getSpecialitiesOptions()}
              required
              fluid
              onChange={this.onDropDownChange}
            />
          </Form.Field>
        </Form.Group>
      </>
    );
  }
}

export interface IProps {
  readonly data: IGroupDTO;
  readonly specialities: ISpecialityDTO[];

  onChange(data: IGroupDTO): void;
}
