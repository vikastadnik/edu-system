import React, { Component } from 'react';
import { IState, IUser } from '../../../interfaces';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import ReactTable, { Column } from 'react-table';
import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { ErrorHandler } from '../../error-handler';
import AddTeacher from '../add-teacher';
import * as teachersActions from '../../../actions/teachers/thunks';
import { AxiosError } from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';

class TeachersList extends Component<IConnectedProps> {

  public async componentDidMount(): Promise<void> {
    if (!this.props.list.length) {
      this.props.fetchTeachers();
    }
  }

  public getTeacherTable = () => {
    const { fetching, list } = this.props;
    const COLUMNS: Column[] = [
      { Header: 'Прізвище', accessor: 'surname' },
      { Header: 'Ім\'я', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Логін', accessor: 'login' },
      {
        Header: '',
        Cell: (row: any) => (
          <div style={{ textAlign: 'center' }} className="table-buttons">
            <Button.Group>
              <Button icon="edit" primary> Редагувати </Button>
              <Button icon="remove" onClick={() => this.props.deleteTeacher(row.original.uuid)}>
                Видалити
              </Button>
            </Button.Group>
          </div>
        )
      }
    ];
    return (
      <ReactTable
        columns={COLUMNS}
        data={list}
        loading={fetching}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        showPageSizeOptions={false}
        resizable={false}
      />
    );
  }

  public render(): JSX.Element {
    return (
      <Container>
        <Header size="large">Список вчителів
          <AddTeacher/>
        </Header>
        <Grid style={{ marginTop: 30 }}>
          <Grid.Row>
            <Grid.Column>
              {this.getTeacherTable()}
              {<ErrorHandler error={this.props.error}/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.teachers.fetching,
  list: state.teachers.list,
  error: state.teachers.error
});

const mapDispatchToProps = {
  fetchTeachers: teachersActions.fetchTeachers,
  deleteTeacher: teachersActions.deleteTeacher,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(TeachersList);

interface IConnectedProps {
  fetching: boolean;
  list: IUser[];
  error: AxiosError;

  fetchTeachers(): void;

  deleteTeacher(uuid: string): void;
}
