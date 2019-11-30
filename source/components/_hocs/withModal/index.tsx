import React, { Component } from 'react';
import { Button, Form, Grid, Modal } from 'semantic-ui-react';
import { ErrorHandler } from '../../error-handler';
import { MODALS_TEXT } from '../../../constants';

export class ModalForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false
    };
  }

  public onSubmitForm = async () => {
    await this.props.onSubmitRequest();
    this.setState({ open: false });
  }

  public onClose = () => {
    this.setState({ open: false });
  }

  public getModalContent = () => {
    const { render, error, loading } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={this.onSubmitForm}>
              {render()}
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="equal">
          <ErrorHandler error={error}/>
        </Grid.Row>

        <Grid.Row columns="equal">
          <Grid.Column>
            <Button
              content={MODALS_TEXT.CANCEL}
              onClick={this.onClose}
              loading={loading}
              disabled={loading}
              secondary
              fluid
            />
          </Grid.Column>

          <Grid.Column>
            <Button
              content={MODALS_TEXT.SAVE}
              onClick={this.onSubmitForm}
              loading={loading}
              disabled={loading}
              primary
              fluid
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  public render(): JSX.Element {
    return (
      <>
        <Button
          content={this.props.modalTitle}
          onClick={() => this.setState({ open: true })}
          icon="edit"
          primary
          style={{ marginLeft: 30 }}
        />

        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          dimmer="inverted"
        >
          <Modal.Header content={this.props.modalTitle}/>
          <Modal.Content content={this.getModalContent()}/>
        </Modal>
      </>
    );
  }
}

interface IProps {
  readonly modalTitle: string;
  loading: boolean;
  error: any;

  onSubmitRequest(): any;

  render(): JSX.Element;
}

interface IState {
  readonly open: boolean;
}
