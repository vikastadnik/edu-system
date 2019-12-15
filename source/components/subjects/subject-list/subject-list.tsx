import React, { Component } from 'react';
import { Button, Grid, Header, Item, Icon, Container, Segment, Loader } from 'semantic-ui-react';
import { IState, ISubjectDTO } from '../../../interfaces';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash-es';
import { ErrorHandler } from '../../error-handler';
import AddSubject from '../add-subject-modal';
import * as subjectsActions from '../../../actions/subjects/thunks';
import { connect } from 'react-redux';

class SubjectList extends Component<IConnectedProps> {

  public async componentDidMount(): Promise<void> {
    if (!this.props.list.length) {
      this.props.fetchSubjects();
    }
  }

  public getSubjectItem = (subject: ISubjectDTO) => {
    const { description: d, imgUrl, name, uuid } = subject;
    const description: string = d.length > 100 ? `${d.substr(0, 100)}...` : d;
    return (
      <Link to={`/subjects/${uuid}`}>
        <Item.Group  style={{marginTop: 20}}>
          <Item>
            <Item.Image src={imgUrl}/>
            <Item.Content>
              <Item.Header as="a">{name}</Item.Header>
              <Item.Description dangerouslySetInnerHTML={{ __html: description }}/>
              <Item.Extra>
                <Button primary floated="right">
                  Детальніше
                  <Icon name="angle right"/>
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Link>
    );
  }

  public getSubjectList = () => {
    const { list, fetching } = this.props;

    if (fetching) {
      return <Loader/>;
    }
    if (isEmpty(list)) {
      return (
        <Segment placeholder style={{ width: '100%', textAlign: 'center' }}>
          <Header icon>
            <Icon name="file outline"/>
            Предмети ще відсутні в даній системі
          </Header>
        </Segment>
      );
    }

    return list.map((subject: ISubjectDTO) => (
      <Grid.Column key={subject.uuid}>{this.getSubjectItem(subject)}</Grid.Column>
    ));
  }

  public render(): JSX.Element {
    return (
      <Container>
        <Header size="large">Список предметів
          <AddSubject/>
        </Header>
        <Grid columns={2} divided>
          <Grid.Row>
            {this.getSubjectList()}
          </Grid.Row>

          <Grid.Row>
            <ErrorHandler error={this.props.error}/>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.subjects.fetching,
  list: state.subjects.list,
  error: state.subjects.error
});

const mapDispatchToProps = {
  fetchSubjects: subjectsActions.fetchSubjects,
  // deleteSubject: subjectsActions.deleteSubject,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);

interface IConnectedProps {
  fetching: boolean;
  list: ISubjectDTO[];
  error: any;

  fetchSubjects(): void;

  // deleteSubject(uuid: string): void;
}
