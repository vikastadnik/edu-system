import * as React from 'react';
import { MODALS_TEXT, SPECIALITY_TEXT } from '../../../constants';
import { InputOnChangeData, Form } from 'semantic-ui-react';
import { MODE, MODES } from '../../../enums';
import { ModalForm } from '../../_hocs/withModal';
import { ISpecialityDTO, IState } from '../../../interfaces';
import * as specialitiesActions from '../../../actions/specialities/thunks';
import { connect } from 'react-redux';

class AddSpeciality extends React.Component<IProps, IStateShape> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: props.speciality || '',
    };
  }

  public onInputChange = (e: object, change: InputOnChangeData) => {
    this.setState({ name: change.value });
  }

  public getModalContent = () => {
    return (
      <Form.Input
        label={SPECIALITY_TEXT.NAME}
        value={this.state.name}
        onChange={this.onInputChange}
        name="name"
        type="text"
        required
      />
    );
  }

  public createSpeciality = async () => {
    const { name } = this.state;
    this.props.addSpeciality({ name });
  }

  public render(): JSX.Element {
    const isEditMode: boolean = this.props.mode === MODES.EDIT;
    const modalTitle: string = isEditMode ? MODALS_TEXT.EDIT_SPECIALITY : MODALS_TEXT.ADD_SPECIALITY;

    return (
      <ModalForm
        modalTitle={modalTitle}
        render={this.getModalContent}
        onSubmitRequest={this.createSpeciality}
        loading={this.props.fetching}
        error={this.props.error}
      />);
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.specialities.fetching,
  error: state.specialities.error
});

const mapDispatchToProps = {
  addSpeciality: specialitiesActions.addSpecialities,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSpeciality);

interface IProps {
  mode?: MODE;
  speciality?: string;
  fetching: boolean;
  error: any;

  addSpeciality(speciality: ISpecialityDTO): void;
}

interface IStateShape {
  readonly name: string;
}
