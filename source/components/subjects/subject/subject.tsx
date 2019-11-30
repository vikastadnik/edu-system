import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { ISubjectDTO, IState as IStore, ISpecialityDTO } from '../../../interfaces';
import { AxiosError } from 'axios';
import { Button, Container, Grid, Header, Loader } from 'semantic-ui-react';
import EditSubject from '../edit-subject';
import { isUserStudent } from '../../../selectors/user';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash-es';
import LessonsList from '../lessons-list';

class Subject extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fetching: true,
      subject: null,
      error: null,
      editMode: false
    };
  }

  public componentDidMount(): void {
    this.fetchSubject();
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState): void {
    // tslint:disable-next-line:no-empty
    if (this.state.editMode && !prevState.editMode && isEmpty(this.props.specialities)) {

    }
  }

  public fetchSubject = () => {
    const { match: {} } = this.props;
    const mockedSubject: ISubjectDTO = {
      uuid: 'sub',
      name: 'Комп\'ютерні науки',
      description: `Ancestry.com — приватна інтернет-компанія, що базується в Леху, штат Юта, США. Це найбільша генеалогічна компанія в світі, вона контролює мережу генеалогічних і історичних сайтів, орієнтованих на США та 9 інших країн. Компанія розробляє і продає генеалогічне програмне забезпечення і супутні послуги`,
      imgURL: 'https://www.uri.edu/programs/wp-content/uploads/programs/sites/3/2014/04/feat_img_comp_sci.jpg'
    };

    setTimeout(() => this.setState({ subject: mockedSubject, fetching: false }), 200);
  }

  public saveSubject = (s: ISubjectDTO) => {
    this.setState({ subject: s, editMode: false });
  }

  public getSubjectInfo = () => {
    const { isAdmin } = this.props;
    const { subject: { name, description } } = this.state;
    return (
      <Container>
        <Grid style={{ marginTop: 30 }}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header>
                {name}
              </Header>
              <div dangerouslySetInnerHTML={{ __html: description }}/>
            </Grid.Column>
            {
              isAdmin && (
                <Grid.Column width={4}>
                  <Button primary onClick={() => this.setState({ editMode: true })}>Редагувати</Button>
                </Grid.Column>
              )
            }
          </Grid.Row>
        </Grid>
        <LessonsList/>
      </Container>
    );
  }

  public render(): JSX.Element {
    const { match: {} } = this.props;
    const { fetching, editMode } = this.state;
    return fetching
      ? <Loader/>
      : editMode
        ? (
          <EditSubject
            subject={this.state.subject}
            onBackToReadonlyView={() => this.setState({ editMode: false })}
            onSaveChanges={this.saveSubject}
          />
        )
        : this.getSubjectInfo();
  }
}

const mapStateToProps = (state: IStore) => ({
  isAdmin: !isUserStudent(state),
  specialities: state.specialities.list
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Subject);

type IProps = RouteConfigComponentProps<{ subjectId: string }> & IConnectedProps;

interface IState {
  readonly subject: ISubjectDTO;
  readonly fetching: boolean;
  readonly error: AxiosError;
  readonly editMode: boolean;
}

interface IConnectedProps {
  readonly isAdmin: boolean;
  readonly specialities: ISpecialityDTO[];
}
