import * as React from 'react';
import { IGroupDTO } from '../../interfaces';
import * as Actions from '../../actions';
import { AxiosError } from 'axios';
import { Button, Grid, Modal } from 'semantic-ui-react';
import { MODALS_TEXT } from '../../constants';
import { autobind } from 'core-decorators';
import { IAddEditGroupModalConnectedProps as IProps } from './add-edit-group-modal-container';
import { GroupInfoForm } from '../../components/group-info-form';
import { GroupApi } from '../../api';
// import { ErrorHandler } from '../../components/error-handler';

export class AddEditGroupModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      activeGroup: this.props.mode === 'EDIT' ? {id: this.props.selectedGroupID} : {},
      error: null
    };
  }

  public componentDidMount(): void {
    if (this.props.mode === 'EDIT') {
      const activeGroup: IGroupDTO = this.props.groupList.find((group: IGroupDTO) =>
        (group.id === this.state.activeGroup.id)
      );
      this.setState({activeGroup});
    }
  }

  @autobind
  public onClose(): void {
    this.setState({open: false, loading: false, error: null});
  }

  @autobind
  public onChange(changes: IGroupDTO): void {
    const activeGroup: IGroupDTO = {...this.state.activeGroup, ...changes};
    this.setState({activeGroup});
  }

  @autobind
  public async onConfirm(): Promise<void> {
    try {
      this.setState({loading: true});
      if (this.props.mode === 'ADD') {
        const createdGroup: IGroupDTO = await GroupApi.createGroup({...this.state.activeGroup});
        this.props.dispatch(Actions.Groups.setGroupAttribute({groupsList: [...this.props.groupList, createdGroup]}));
      } else {
        await GroupApi.updateGroup({...this.state.activeGroup});
      }
      this.setState({loading: false, open: false});
    } catch (e) {
      this.setState({error: e, loading: false});
    }
  }

  public getCancelButton(): JSX.Element {
    return (
      <Button
        content={MODALS_TEXT.CANCEL}
        onClick={this.onClose}
        loading={this.state.loading}
        disabled={this.state.loading}
        secondary
        fluid
      />);
  }

  public getConfirmButton(): JSX.Element {
    return (
      <Button
        content={MODALS_TEXT.SAVE}
        onClick={this.onConfirm}
        loading={this.state.loading}
        disabled={this.state.loading}
        primary
        fluid
      />
    );
  }

  public getModalContent(): JSX.Element {
    const error: JSX.Element = this.state.error ? null : null;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <GroupInfoForm
              loading={this.state.loading}
              data={this.state.activeGroup}
              onChange={this.onChange}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="equal">
          {error}
        </Grid.Row>

        <Grid.Row columns="equal">
          <Grid.Column>
            {this.getCancelButton()}
          </Grid.Column>

          <Grid.Column>
            {this.getConfirmButton()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  public render(): JSX.Element {
    const onOpen: () => void = () => {
      this.setState({open: true});
    };

    const modalTitle: string = this.props.mode === 'EDIT' ? MODALS_TEXT.EDIT_GROUP : MODALS_TEXT.ADD_GROUP;
    const disabled: boolean = !(this.props.mode === 'EDIT' && this.props.selectedGroupID);
    return (
      <React.Fragment>
        <Button
          content={modalTitle}
          onClick={onOpen}
          icon="edit"
          disabled={this.props.mode === 'ADD' ? false : disabled}
          primary
          fluid
        />

        <Modal
          open={this.state.open}
          onClose={this.onClose}
          dimmer="inverted"
          size="small"
        >
          <Modal.Header content={modalTitle}/>
          <Modal.Content content={this.getModalContent()}/>
        </Modal>
      </React.Fragment>
    );
  }
}

export interface IState {
  readonly open: boolean;
  readonly loading: boolean;
  readonly activeGroup: IGroupDTO;
  readonly error: AxiosError;
}
