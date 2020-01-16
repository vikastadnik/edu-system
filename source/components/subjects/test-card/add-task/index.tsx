import { Component, default as React } from 'react';
import { DropdownItemProps, Form, InputOnChangeData, Radio, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ModalForm } from '../../../_hocs/withModal';
import { IState, ISubjectDTO } from '../../../../interfaces';
import { CARD_TYPES, TEST_TYPES, TEST_TYPES_TITLES } from '../../../../enums';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { RouteConfigComponentProps } from 'react-router-config';
import { addTaskToSubject } from '../../../../actions/subjects/thunks';
import { isUserStudent } from '../../../../selectors/user';

class AddTask extends Component<IConnectedProps, IStateShape> {
  constructor(props: IConnectedProps) {
    super(props);

    this.state = {
      type: TEST_TYPES.FORMULA,
      answer: '',
      content: '',
      params: '',
      infoPageUuid: '',
      testPageUuid: '',
    };
  }

  public componentDidMount(): void {
    const { match: { params: { cardId } } } = this.props;
    if (cardId) {
      const infoPageUuid = this.props.currentSubject?.cards?.find((c) => c.uuid === cardId)?.parentUuid;
      this.setState({ testPageUuid: cardId, infoPageUuid });
    }
  }

  public onInputChange = (e: object, change: InputOnChangeData) => {
    this.setState({ [change.name]: change.value });
  }

  public onRadioChange = (e, { value }) => this.setState({ type: value });

  public getCardsOptionsByType(type): DropdownItemProps[] {
    if (!this.props.currentSubject) return null;

    const { currentSubject: { cards } } = this.props;
    return cards.filter((c) => c.type === type)
      .map((c) => ({ value: c.uuid, key: c.uuid, text: c.title }));
  }

  public onSubmitForm = async () => {
    const { type, testPageUuid, content, answer, infoPageUuid, params } = this.state;

    this.props.addTaskToSubject({
      type, testPageUuid, content, answer, infoPageUuid, params
    });
  }

  public getFormComponent = () => {
    if (this.props.isStudent) return null;
    const { type } = this.state;
    return (
      <>
        <Form.Field style={{ marginBottom: 20, marginTop: 20 }}>
          <label>Тип завдання кадру</label>
          <Radio
            label={TEST_TYPES_TITLES[TEST_TYPES.FORMULA]}
            name="type"
            value={TEST_TYPES.FORMULA}
            checked={type === TEST_TYPES.FORMULA}
            onChange={this.onRadioChange}
          />

          <Radio
            style={{ marginLeft: 20 }}
            label={TEST_TYPES_TITLES[TEST_TYPES.QUESTION]}
            name="type"
            value={TEST_TYPES.QUESTION}
            checked={type === TEST_TYPES.QUESTION}
            onChange={this.onRadioChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Інформаційний кадр, до якого відноситься даний тест</label>
          <Select
            name="infoPageUuid"
            options={this.getCardsOptionsByType(CARD_TYPES.INFO)}
            value={this.state.infoPageUuid}
            onChange={this.onInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Тестовий кадр, до якого відноситься дане завдання</label>
          <Select
            name="testPageUuid"
            options={this.getCardsOptionsByType(CARD_TYPES.TEST)}
            value={this.state.testPageUuid}
            onChange={this.onInputChange}
          />
        </Form.Field>

        {type === TEST_TYPES.FORMULA &&
        (<>
            <Form.Input
              required
              label={'Формула'}
              value={this.state.params}
              name="params"
              onChange={this.onInputChange}
            />

            <Form.Input
              required
              label={'Параметри'}
              value={this.state.answer}
              name="answer"
              onChange={this.onInputChange}
            />
          </>
        )}

        {type === TEST_TYPES.QUESTION &&
        (<>
            <Form.Input
              required
              label={'Питання'}
              value={this.state.content}
              name="content"
              onChange={this.onInputChange}
            />

            <Form.Input
              required
              label={'Відповідь'}
              value={this.state.answer}
              name="answer"
              onChange={this.onInputChange}
            />
          </>
        )}
      </>
    );
  }

  public render(): JSX.Element {
    if (this.props.isStudent) return null;
    return (
      <ModalForm
        modalTitle="Додати завдання для тестового кадру"
        render={this.getFormComponent}
        onSubmitRequest={this.onSubmitForm}
        loading={this.props.fetching}
        error={this.props.error}
      />);
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.teachers.fetching,
  error: state.teachers.error,
  currentSubject: state.subjects.currentSubject,
  isStudent: isUserStudent(state)
});

const mapDispatchToProps = {
  addTaskToSubject
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AddTask);

interface IStateShape {
  [key: string]: string;

  answer: string;
  content: string;
  infoPageUuid: string;
  params: string;
  testPageUuid: string;
  type: TEST_TYPES.FORMULA | TEST_TYPES.QUESTION;
}

interface IConnectedProps extends RouteConfigComponentProps<{ cardId: string }> {
  readonly fetching: boolean;
  readonly error: boolean;
  currentSubject: ISubjectDTO;
  isStudent: boolean;

  addTaskToSubject(t): any;
}
