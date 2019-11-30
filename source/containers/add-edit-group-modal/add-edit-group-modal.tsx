import * as React from 'react';
import { IGroupDTO } from '../../interfaces';
import * as Actions from '../../actions';
import { autobind } from 'core-decorators';
import { IAddEditGroupModalConnectedProps as IProps } from './add-edit-group-modal-container';
import { GroupInfoForm } from '../../components/group-info-form';
import { GroupApi } from '../../api';
import { ModalForm } from '../../components/_hocs/withModal';

export class AddEditGroupModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeGroup: this.editMode ? this.props.groupList.find((g) => g.uuid === this.props.selectedGroupID) : {},
    };
  }

  get editMode(): boolean {
    return this.props.mode === 'EDIT';
  }

  public async componentDidMount(): Promise<void> {
    // tslint:disable-next-line:no-empty
    if (!this.props.specialities.length) {
    }

    if (this.props.mode === 'EDIT') {
      const activeGroup: IGroupDTO = this.props.groupList.find((group: IGroupDTO) =>
        (group.uuid === this.state.activeGroup.uuid)
      );
      this.setState({ activeGroup });
    }
  }

  public onChange(changes: IGroupDTO): void {
    const activeGroup: IGroupDTO = { ...this.state.activeGroup, ...changes };
    this.setState({ activeGroup });
  }

  @autobind
  public async onConfirm(): Promise<void> {
    try {

      if (this.props.mode === 'ADD') {
        const createdGroup: IGroupDTO = await GroupApi.createGroup({ ...this.state.activeGroup });
        this.props.dispatch(Actions.Groups.setGroupAttribute({ groupsList: [...this.props.groupList, createdGroup] }));
      } else {
        await GroupApi.updateGroup({ ...this.state.activeGroup });
      }

      // tslint:disable-next-line:no-empty
    } catch (e) {
    }
  }

  public getFormComponent = () => {
    return (
      <GroupInfoForm
        data={this.state.activeGroup}
        specialities={this.props.specialities}
        onChange={this.onChange}
      />
    );
  }

  public render(): JSX.Element {
    return (
      <ModalForm
        modalTitle="Додати вчителя"
        render={this.getFormComponent}
        onSubmitRequest={() => null}
        error={null}
        loading={false}
      />);
  }
}

export interface IState {
  readonly activeGroup: IGroupDTO;
}
