import React, { Component } from 'react';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Loader,
  Message,
  Segment
} from 'semantic-ui-react';
import { ICardDTO, IState as IStore, ISubjectDTO, ITaskDTO } from '../../../interfaces';
import { RouteConfigComponentProps } from 'react-router-config';
import { setCurrentSubject, setCurrentTestCard } from '../../../actions/subjects/thunks';
import { isAdmin, isTeacher, isUserStudent } from '../../../selectors/user';
import AddTask from './add-task';
import { BaseAPI } from '../../../api';
import { AxiosError, AxiosResponse } from 'axios';

export class TestCard extends Component<IProps, IState> {

  public static getDerivedStateFromProps(nextProps: IProps) {
    if (nextProps.currentSubject) {
      return { card: nextProps.currentSubject?.cards.find((c) => c.uuid === nextProps.match.params.cardId) };
    }
    return null;
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      results: null,
      loading: false,
      error: null
    };
  }

  public async componentDidMount() {
    const { match: { params: { cardId } } } = this.props;

    const { currentSubject, match: { params: { subjectId } } } = this.props;
    if (!currentSubject) {
      this.props.setCurrentSubject(subjectId);
    }
    this.props.setCurrentTestCard(cardId);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.currentCard
      && this.props.currentCard
      && prevProps.currentCard.uuid !== this.props.currentCard.uuid
    ) {
      this.setState({ results: null });
    }
  }

  public renderTask = (task) => {
    if (!task) return null;
    const { results } = this.state;
    const valid = results?.tasks?.find((t) => t.taskUuid === task.uuid)?.result;
    return (
      <Form.Field required key={task.uuid}>
        <div dangerouslySetInnerHTML={{ __html: task.content }}/>
        <Form.Input
          required
          name={task.uuid}
          error={results ? !valid : null}
        />
      </Form.Field>
    );
  }

  public onSubmit = async (e) => {
    const results = this.props.currentCard.tasks.map((t: ITaskDTO) => ({
      answer: e.currentTarget.elements[t.uuid]?.value,
      taskUuid: t.uuid
    }));
    this.setState({ loading: true });
    try {
      const response: AxiosResponse = await BaseAPI.request({
        method: 'post',
        url: `/cards/test/${this.props.currentCard.uuid}/validate`,
        data: results
      });

      this.setState({ loading: false, results: response.data, error: null });
    } catch (e) {
      this.setState({ loading: false, results: null, error: e });
    }
  }

  public renderNavButtons = (b: 'next' | 'prev' = 'next') => {
    const { match: { params: { subjectId } }, currentCard: card } = this.props;
    if (b === 'prev') {
      return (
        <Grid.Row>
          <Grid.Column style={{ justifyContent: 'flex-start', display: 'flex' }}>
            {card.parentType && card.parentUuid &&
            <Link to={`/subjects/${subjectId}/${card.parentType?.toLowerCase()}-card/${card.parentUuid}`}>
              <Button icon="left arrow" labelPosition="left" content="Попередній урок"/>
            </Link>}
          </Grid.Column>
        </Grid.Row>
      );
    }
    return (
      <Grid.Row>
        <Grid.Column style={{ justifyContent: 'flex-end', display: 'flex' }}>
          {card.nextType && card.nextUuid &&
          <Link to={`/subjects/${subjectId}/${card.nextType?.toLowerCase()}-card/${card.nextUuid}`}>
            <Button
              content="Наступний урок"
              icon="right arrow"
              labelPosition="right"
              onClick={() => card.nextType === 'TEST' && this.props.setCurrentTestCard(card.nextUuid)}
            />
          </Link>}
        </Grid.Column>
      </Grid.Row>
    );
  }

  public render(): JSX.Element {
    const { currentCard: card } = this.props;
    const { loading, results } = this.state;
    if (!card) {
      return <Loader size="large"/>;
    }

    return (
      <Container>
        <Grid style={{ marginTop: 30 }}>
          {/*Test header*/}
          <Grid.Row>
            <Grid.Column>
              <Header as={'h5'} dividing style={{ width: '100%' }}>
                {card.title}
                {(isTeacher || isAdmin) && <AddTask/>}
              </Header>
            </Grid.Column>
          </Grid.Row>

          {/*Test description*/}
          <Grid.Row>
            <Grid.Column>
              <div dangerouslySetInnerHTML={{ __html: card.content }}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {!this.props.currentCard.tasks && (
                <Segment placeholder style={{ width: '100%', textAlign: 'center' }}>
                  <Header icon>
                    <Icon name="file outline"/>
                    Завдання ще відсутні в даному тесті
                  </Header>
                </Segment>
              )}

              <Form onSubmit={this.onSubmit} loading={loading}>
                {this.props.currentCard?.tasks?.map((t) => this.renderTask(t))}
                {!results && <Button content="Готово" onClick={this.onSubmit}/>}
              </Form>
              {results?.success && (
                <Message
                  success
                  header="Тест пройдено успішно"
                  content="Можете переходити до наступного уроку"
                />)
              }

              {results && !results.success && (
                <Message
                  error
                  header="Ви не пройшли тест"
                  content="Повторіть навчальний матеріал"
                />)
              }
              {results && this.renderNavButtons(results.success ? 'next' : 'prev')}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  currentSubject: state.subjects.currentSubject,
  currentCard: state.subjects.currentCard,
  isTeacher: isTeacher(state),
  isAdmin: isAdmin(state),
  isStudent: isUserStudent(state)
});

const mapDispatchToProps = { setCurrentSubject, setCurrentTestCard };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TestCard);

type IProps =
  RouteConfigComponentProps<{ cardId: string, subjectId: string }>
  & IPr;

interface IState {
  [key: string]: any;

  loading: boolean;
  error: AxiosError;

  results: {
    success: boolean;
    tasks: Array<{
      answer: string;
      result: boolean;
      taskUuid: string;
    }>
  };
}

interface IPr {
  currentSubject: ISubjectDTO;
  currentCard: ICardDTO;
  isTeacher: boolean;
  isAdmin: boolean;
  isStudent: boolean;

  setCurrentSubject(data): void;

  setCurrentTestCard(data): void;
}
