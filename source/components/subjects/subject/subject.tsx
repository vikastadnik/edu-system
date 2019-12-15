import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { ISubjectDTO, IState as IStore } from '../../../interfaces';
import { Button, Container, Grid, Header, Loader } from 'semantic-ui-react';
import EditSubject from '../edit-subject';
import { isUserStudent } from '../../../selectors/user';
import { connect } from 'react-redux';
import LessonsList from '../lessons-list';
import { setCurrentSubject } from '../../../actions/subjects/thunks';

class Subject extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  public componentDidMount(): void {
    const { match: { params: { subjectId } } } = this.props;
    this.props.setCurrentSubject(subjectId);

  }

  public saveSubject = (s: ISubjectDTO) => {
    return null;
  }

  public getSubjectInfo = () => {
    const { isAdmin } = this.props;
    const { subject: { name, description } } = this.props;
    return (
      <Container>
        <Grid style={{ marginTop: 30 }}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header as="h1">{name}</Header>
              <div dangerouslySetInnerHTML={{ __html: description }}/>
            </Grid.Column>
            {isAdmin && (
                <Grid.Column width={4}>
                  <Button primary onClick={() => this.setState({ editMode: true })}>Редагувати</Button>
                </Grid.Column>
              )}
          </Grid.Row>
        </Grid>
        <LessonsList/>
      </Container>
    );
  }

  public render(): JSX.Element {
    const { fetching, subject } = this.props;
    const { editMode } = this.state;
    if (fetching) return  <Loader/>;
    if (!subject) return null;
    return editMode
        ? (
          <EditSubject
            subject={this.props.subject}
            onBackToReadonlyView={() => this.setState({ editMode: false })}
            onSaveChanges={this.saveSubject}
          />
        )
        : this.getSubjectInfo();
  }
}

const mapStateToProps = (state: IStore) => ({
  isAdmin: !isUserStudent(state),
  fetching: state.subjects.fetching,
  error: state.subjects.error,
  subject: state.subjects.currentSubject
});

const mapDispatchToProps = { setCurrentSubject };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Subject);

type IProps = RouteConfigComponentProps<{ subjectId: string }> & IConnectedProps;

interface IState {
  readonly editMode: boolean;
}

interface IConnectedProps {
  readonly isAdmin: boolean;
  fetching: boolean;
  error: any;
  subject: ISubjectDTO;

  setCurrentSubject(data): void;
}
