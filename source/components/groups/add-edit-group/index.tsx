import * as React from 'react';
import { ModalForm } from '../../_hocs/withModal';
import { GroupInfoForm } from '../../group-info-form';
import { IGroupDTO, ISpecialityDTO, IState } from '../../../interfaces';
import * as groupsActions from '../../../actions/groups/thunks';
import * as specialitiesActions from '../../../actions/specialities/thunks';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AxiosError } from 'axios';

class AddEditGroupModal extends React.Component<IProps, ICompState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      group: null
    };
  }

  public async componentDidMount(): Promise<void> {
    if (!this.props.specialities.length) {
      this.props.fetchSpecialities();
    }
  }

  public onChange = (changes: IGroupDTO) => {
    const group: IGroupDTO = { ...this.state.group, ...changes };
    this.setState({ group });
  }

  public addGroup = () => {
    this.props.addGroup(this.state.group);
  }

  public render(): JSX.Element {
    return (
      <ModalForm
        modalTitle="Додати групу"
        onSubmitRequest={this.addGroup}
        error={this.props.error}
        loading={this.props.fetching}
        render={() => (
          <GroupInfoForm
            data={this.state.group}
            specialities={this.props.specialities}
            onChange={this.onChange}
          />
        )}
      />);
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.groups.fetching,
  error: state.groups.error,
  specialities: state.specialities.list
});

const mapDispatchToProps = {
  addGroup: groupsActions.addGroup,
  fetchSpecialities: specialitiesActions.fetchSpecialities,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddEditGroupModal);

export interface IProps {
  readonly fetching: boolean;
  readonly specialities: ISpecialityDTO[];
  readonly error: AxiosError;

  addGroup(group): void;

  fetchSpecialities(): void;
}

interface ICompState {
  readonly  group: IGroupDTO;
}
