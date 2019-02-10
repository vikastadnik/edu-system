import * as React from 'react';
import ReactTable, { Column, RowInfo } from 'react-table';
import { Grid, Header } from 'semantic-ui-react';
import { autobind } from 'core-decorators';
import { DEFAULT_PAGE_SIZE, GROUP_TEXT, TABLE_SELECTION_BACKGROUND_COLOR } from '../../constants';
import { IGroupDTO } from '../../interfaces';
import { AxiosError } from 'axios';
import { ErrorHandler } from '../error-handler';
import { AddEditGroupModalContainer } from '../../containers/add-edit-group-modal';

export class GroupListView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedID: null,
    };
  }

  @autobind
  public getTrProps(table: object, row: RowInfo): object {
    const onClick: () => void = (): void => {
      this.setState({ selectedID: row.original.id });
      this.props.onSelect(row.original.id);
    };

    const style: React.CSSProperties = {
      background:
        (row && this.state.selectedID === row.original.id) ? TABLE_SELECTION_BACKGROUND_COLOR : 'inherit'
    };

    return { onClick, style };
  }

  public getGroupsTable(): JSX.Element {
    return (
      <ReactTable
        columns={COLUMNS}
        data={this.props.groupsList}
        loading={this.props.loading}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        getTrProps={this.getTrProps}
        showPageSizeOptions={false}
        resizable={false}
      />
    );
  }

  public render(): JSX.Element {
    const errorHandler: JSX.Element = this.props.error ? <ErrorHandler error={this.props.error.message}/> : null;
    return (
      <React.Fragment>
        <Header size="large">{GROUP_TEXT.GROUPS_HEADER}</Header>
        <Grid.Row columns="equal">
          <Grid.Column>
            {this.getGroupsTable()}
            {errorHandler}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="equal">
          <Grid.Column>
            <AddEditGroupModalContainer mode={'ADD'}/>
          </Grid.Column>

          <Grid.Column>
            <AddEditGroupModalContainer mode={'EDIT'}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}

const COLUMNS: Column[] = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Faculty', accessor: 'faculty' },
];

export interface IProps {
  readonly loading: boolean;
  readonly groupsList: IGroupDTO[];
  readonly error: AxiosError;

  onSelect(groupID: number): void;
}

export interface IState {
  readonly selectedID: number;

}
