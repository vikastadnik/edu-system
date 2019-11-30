import React, { Component } from 'react';
import { DropdownItemProps, Form, InputOnChangeData, Select } from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ModalForm } from '../../_hocs/withModal';
import { IState, ISubjectDTO, IUser } from '../../../interfaces';
import * as subjectsActions from '../../../actions/subjects/thunks';
import { connect } from 'react-redux';
import { fetchTeachers } from '../../../actions/teachers/thunks';

class AddSubject extends Component<IConnectedProps, IStateShape> {
  constructor(props: IConnectedProps) {
    super(props);
    this.state = {
      name: '', description: '', imgURL: '', teacherUuid: ''
    };
  }

  public componentDidMount() {
    if (!this.props.teacherList?.length) {
      this.props.fetchTeachers();
    }
  }

  public getTeacherOptions(): DropdownItemProps[] {
    return this.props.teacherList.map((t: IUser) => ({
      value: t.uuid,
      key: t.uuid,
      text: `${t.surname} ${t.name}`
    }));
  }

  public onInputChange = (e: object, change: InputOnChangeData) => {
    this.setState({ [change.name]: change.value });
  }

  public onDescriptionChange = (e: object, editor: any) => {
    this.setState({ description: editor.getData() });
  }

  public onSubmitForm = async () => {
    const { name, description, imgURL, teacherUuid } = this.state;
    this.props.addSubject({ name, description, imgURL, teacherUuid });
  }

  public getFormComponent = () => {
    const { name, description, imgURL } = this.state;
    return (
      <>
        <Form.Input
          label={'Назва'}
          value={name}
          name="name"
          onChange={this.onInputChange}
        />

        <Form.Input
          label={'Посилання на прев\'ю зображення'}
          value={imgURL}
          name="imgURL"
          onChange={this.onInputChange}
        />
        <Form.Field>
          <label>Вчитель дисципліни</label>
          <Select
            name="teacherUuid"
            options={this.getTeacherOptions()}
            onChange={this.onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Опис дисципліни</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={this.onDescriptionChange}
          />
        </Form.Field>
      </>
    );
  }

  public render(): JSX.Element {
    return (
      <ModalForm
        modalTitle="Додати предмет"
        render={this.getFormComponent}
        onSubmitRequest={this.onSubmitForm}
        loading={this.props.fetching}
        error={this.props.error}
      />);
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.subjects.fetching || state.teachers.fetching,
  error: state.subjects.error || state.teachers.error,
  teacherList: state.teachers.list
});

const mapDispatchToProps = {
  fetchTeachers,
  addSubject: subjectsActions.addSubject,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubject);

interface IStateShape {
  [key: string]: string;

  readonly name?: string;
  readonly description?: string;
  readonly imgURL?: string;
}

interface IConnectedProps {
  readonly fetching: boolean;
  readonly error: boolean;
  readonly teacherList: IUser[];

  addSubject?(s: ISubjectDTO): any;

  fetchTeachers?(): any;
}
