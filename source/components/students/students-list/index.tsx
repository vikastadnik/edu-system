import * as React from 'react';
import { IState, IStudentDTO } from '../../../interfaces';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AxiosError } from 'axios';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { ErrorHandler } from '../../error-handler';
import ReactTable, { Column } from 'react-table';
import { DEFAULT_PAGE_SIZE } from '../../../constants';

export class StudentList extends React.Component<IConnectedProps> {

  public getStudentTable = () => {
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
              <Button icon="remove" onClick={() => null} content=" Видалити"/>
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
        <Header size="large">Список студентів групи </Header>
        <Grid style={{ marginTop: 30 }}>
          <Grid.Row>
            <Grid.Column>
              {this.getStudentTable()}
              <ErrorHandler error={this.props.error}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.students.fetching,
  list: state.groups.studentList,
});

export default compose(connect(mapStateToProps))(StudentList);

interface IConnectedProps {
  fetching: boolean;
  list: IStudentDTO[];
  error: AxiosError;

  fetchStudents(): void;

  // deleteTeacher(uuid: string): void;
}
