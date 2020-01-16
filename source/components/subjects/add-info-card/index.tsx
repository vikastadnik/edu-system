import React, { Component } from 'react';
import {
  Button, Checkbox, Container,
  DropdownItemProps,
  Form,
  Grid,
  Header,
  InputOnChangeData,
  Loader,
  Message,
  Radio,
  Select
} from 'semantic-ui-react';
import { IState as IStore, ISubjectDTO } from '../../../interfaces';
import { isAdmin, isTeacher } from '../../../selectors/user';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteConfigComponentProps } from 'react-router-config';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MODALS_TEXT } from '../../../constants';
import { CARD_TYPES, CARD_TYPES_TITLES } from '../../../enums';
import { ErrorHandler } from '../../error-handler';
import { AxiosError } from 'axios';
import { addCardToSubject, setCurrentSubject } from '../../../actions/subjects/thunks';

class AddInfoCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      success: false,
      title: '',
      content: '',
      type: 'INFO',
      firstPage: false,
      parentType: null,
      parentUuid: ''
    };
  }

  public async componentDidMount() {
    const { currentSubject, match: { params: { subjectId } } } = this.props;
    if (!currentSubject) {
      this.props.setCurrentSubject(subjectId);
    }
  }

  public componentDidUpdate(prevProps: IConnectedProps): void {
    if (!this.props.currentSubject || !prevProps.currentSubject) return;

    const { currentSubject: { cards }, match: { params: { subjectId } }, history } = this.props;
    if (cards.length > prevProps.currentSubject.cards.length) {
      history.push(`/subjects/${subjectId}/`);
    }
  }

  public onInputChange = (e: object, change: InputOnChangeData) => this.setState({ [change.name]: change.value });

  public onContentChange = (e: object, editor: any) => this.setState({ content: editor.getData() });

  public onRadioChange = (e, { value }) => this.setState({ type: value });

  public onCheckBoxChange = (e, { value }) => this.setState({ firstPage: value });

  public onChangeParentLesson = (e: object, change: InputOnChangeData) => {
    const parentLesson = this.props.currentSubject.cards.find((l) => l.uuid === change.value);
    this.setState({ parentUuid: parentLesson.uuid, parentType: parentLesson.type });
  }

  public getCardsOptions(): DropdownItemProps[] {
    if (!this.props.currentSubject) return null;

    const { currentSubject: { cards } } = this.props;
    return cards?.map((c) => ({ value: c.uuid, key: c.uuid, text: c.title }));
  }

  public onSubmitForm = async () => {
    const { title, content, firstPage, parentUuid, parentType, type } = this.state;

    this.props.addCardToSubject({
      title, type,
      content, firstPage,
      parentType, parentUuid,
      lessonUuid: this.props.currentSubject.uuid
    });
  }

  public render(): JSX.Element {
    const { title, content, type, success, firstPage } = this.state;
    const { fetching, currentSubject, error } = this.props;
    if (fetching || !currentSubject) {
      return <Loader/>;
    }
    return (
      <Container>
        <Grid style={{ marginTop: 30 }}>
          <Grid.Row>
            <Header as={'h5'}>Додати навчальний кадр для предмету {currentSubject.name}</Header>
          </Grid.Row>

          <Form style={{ width: '100%' }} loading={fetching}>
            <Form.Input
              required
              label={'Назва'}
              value={title}
              name="title"
              onChange={this.onInputChange}
            />

            <Form.Field style={{ marginBottom: 20, marginTop: 20 }}>
              <label>Тип інформаційного кадру</label>
              <Radio
                label={CARD_TYPES_TITLES[CARD_TYPES.INFO]}
                name={type}
                value={CARD_TYPES.INFO}
                checked={type === CARD_TYPES.INFO}
                onChange={this.onRadioChange}
              />

              <Radio
                style={{ marginLeft: 20 }}
                label={CARD_TYPES_TITLES[CARD_TYPES.TEST]}
                name={type}
                value={CARD_TYPES.TEST}
                checked={type === CARD_TYPES.TEST}
                onChange={this.onRadioChange}
              />

            </Form.Field>

            {type === CARD_TYPES.INFO && (<Form.Field>
              <Checkbox
                label="Даний блок знань є першим"
                checked={firstPage}
                name="firstPage"
                onChange={this.onCheckBoxChange}
              />
            </Form.Field>)}

            <Form.Field>
              <label>Попередній блок знань</label>
              <Select
                name="parentUuid"
                options={this.getCardsOptions()}
                value={this.state.parentUuid}
                onChange={this.onChangeParentLesson}
              />
            </Form.Field>

            <Form.Field required>
              <label>Зміст уроку</label>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={this.onContentChange}
              />
            </Form.Field>

            <Form.Group widths="equal">
              <Button
                content={MODALS_TEXT.CANCEL}
                onClick={() => null}
                secondary
                fluid
              />

              <Button
                content={MODALS_TEXT.SAVE}
                onClick={this.onSubmitForm}
                primary
                fluid
              />
            </Form.Group>
          </Form>

          <ErrorHandler error={error}/>
          {success && <Message positive header="Навчальний кадр додано успішно!"/>}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  hasAccess: isTeacher(state) || isAdmin(state),
  currentSubject: state.subjects.currentSubject,
  fetching: state.subjects.fetching,
  error: state.subjects.error
});

const mapDispatchToProps = { setCurrentSubject, addCardToSubject };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AddInfoCard);

type IProps = RouteConfigComponentProps<{ subjectId: string }> & IConnectedProps;

interface IConnectedProps {
  readonly hasAccess: boolean;
  currentSubject: ISubjectDTO;
  fetching: boolean;
  error: any;

  setCurrentSubject(data): void;

  addCardToSubject(data): void;
}

interface IState {
  readonly [key: string]: any;

  readonly title: string;
  readonly type: 'TEST' | 'INFO';
  readonly content: string;
  readonly firstPage: boolean;
  readonly parentUuid?: string;
  readonly parentType?: 'TEST' | 'INFO' | null;
  loading: boolean;
  error: AxiosError;
  success: boolean;
}
