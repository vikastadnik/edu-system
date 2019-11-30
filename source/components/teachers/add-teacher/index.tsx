import { Component, default as React } from 'react';
import { Form, InputOnChangeData } from 'semantic-ui-react';
import { ModalForm } from '../../_hocs/withModal';
import * as teachersActions from '../../../actions/teachers/thunks';
import { IState, IUser } from '../../../interfaces';
import { connect } from 'react-redux';

class AddTeacher extends Component<IConnectedProps, IStateShape> {
  constructor(props: IConnectedProps) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      email: ''
    };
  }

  public onInputChange = (e: object, change: InputOnChangeData) => {
    this.setState({ [change.name]: change.value });
  }

  public createTeacher = async () => {
    const { name, surname, email } = this.state;
    this.props.addTeacher({ name, surname, email });
  }

  public getFormComponent = () => {
    return (
      <>
        <Form.Input
          label={'Iм\'я'}
          value={this.state.name}
          onChange={this.onInputChange}
          name="name"
          type="text"
          required
        />

        <Form.Input
          label={'Прізвище'}
          value={this.state.surname}
          onChange={this.onInputChange}
          name="surname"
          type="text"
          required
        />

        <Form.Input
          label={'Email'}
          value={this.state.email}
          onChange={this.onInputChange}
          name="email"
          type="text"
          required
        />
      </>
    );
  }

  public render(): JSX.Element {
    return (
      <ModalForm
        modalTitle="Додати вчителя"
        render={this.getFormComponent}
        onSubmitRequest={this.createTeacher}
        loading={this.props.fetching}
        error={this.props.error}
      />);
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.teachers.fetching,
  error: state.teachers.error
});

const mapDispatchToProps = {
  addTeacher: teachersActions.addTeacher,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTeacher);

interface IStateShape {
  [key: string]: string;

  readonly name: string;
  readonly surname: string;
  readonly email: string;
}

interface IConnectedProps {
  readonly fetching: boolean;
  readonly error: boolean;

  addTeacher(t: IUser): any;
}
