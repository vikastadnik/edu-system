import * as React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { DEFAULT_PAGE_SIZE, SPECIALITY_TEXT } from '../../../constants';
import ReactTable from 'react-table';
import { ISpecialityDTO, IState, IUser } from '../../../interfaces';
import { AxiosError } from 'axios';
import { ErrorHandler } from '../../error-handler';
import AddSpeciality from '../add-speciality';
import * as specialitiesActions from '../../../actions/specialities/thunks';
import { compose } from 'redux';
import { connect } from 'react-redux';

class SpecialitiesList extends React.Component<IConnectedProps> {
  public componentDidMount(): void {
    if (!this.props.list.length) {
      this.props.fetchSpecialities();
    }
  }

  public getSpecialitiesGroupsTable: () => JSX.Element = () => (
    <ReactTable
      columns={this.COLUMNS()}
      data={this.props.list}
      loading={this.props.fetching}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      showPageSizeOptions={false}
      resizable={false}
    />
  )

  public COLUMNS = () => [
    { Header: 'Назва спеціальності', accessor: 'name' },
    {
      Header: '',
      Cell: (row: any) => (
        <div style={{ textAlign: 'right' }}>
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <Button circular icon="delete" onClick={() => null}/>
        </div>
      )
    }
  ]

  public render(): JSX.Element {
    return (
      <Container>
        <Header style={{ marginBottom: 30 }}>
          {SPECIALITY_TEXT.SPECIALITY_TABLE_HEADER}
          <AddSpeciality mode={'ADD'} speciality={null}/>
        </Header>
        <Grid>
          <Grid.Row centered>
            <Grid.Column>
              {this.getSpecialitiesGroupsTable()}
              <ErrorHandler error={this.props.error}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.specialities.fetching,
  list: state.specialities.list,
  error: state.specialities.error
});

const mapDispatchToProps = {
  fetchSpecialities: specialitiesActions.fetchSpecialities,
  // deleteSpeciality: specialitiesActions.delete,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(SpecialitiesList);

interface IConnectedProps {
  fetching: boolean;
  list: IUser[];
  error: AxiosError;

  fetchSpecialities(): void;

  deleteSpeciality(uuid: string): void;
}


export interface IProps {
  readonly specialityList: ISpecialityDTO[];
  readonly loading: boolean;
  readonly error: AxiosError;

  onAddSpeciality(speciality: ISpecialityDTO): void;

  onRemoveSpeciality(speciality: ISpecialityDTO): void;
}
