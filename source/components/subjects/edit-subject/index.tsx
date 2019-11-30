import React, { Component } from 'react';
import { Button, Container, Form, Grid, InputOnChangeData } from 'semantic-ui-react';
import { ISubjectDTO } from '../../../interfaces';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class EditSubject extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      subject: this.props.subject
    };
  }

  public onInputChange = (e: object, change: InputOnChangeData) => {
    const { subject } = this.state;
    this.setState({ subject: { ...subject, [change.name]: change.value } });
  }

  public onChangeDesctiption = (e: object, editor: any) => {
    const { subject } = this.state;
    this.setState({ subject: { ...subject, description: editor.getData() } });
  }

  public onSave = () => {
    const { subject } = this.state;
    this.props.onSaveChanges(subject);
  }

  public render(): JSX.Element {
    const { subject: { name, description } } = this.state;
    return (
      <Container>
        <Form>
          <Grid style={{ marginTop: 30 }}>
            <Grid.Row>
              <Grid.Column width={12}>
                <Form.Input
                  value={name}
                  name="name"
                  onChange={this.onInputChange}
                />
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={this.onChangeDesctiption}

                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Button content="Зберегти" primary onClick={this.onSave}/>
                <Button content="Відмінити" secondary onClick={this.props.onBackToReadonlyView}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

interface IProps {
  readonly subject: ISubjectDTO;

  onBackToReadonlyView?(): void;

  onSaveChanges?(s: ISubjectDTO): void;
}

interface IState {
  readonly subject: ISubjectDTO;
}
