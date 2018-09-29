import * as React from 'react';
import ReactTable, { Column, RowInfo } from 'react-table';
import { Grid, Header } from 'semantic-ui-react';
import { autobind } from 'core-decorators';
import { DEFAULT_PAGE_SIZE, GROUP_TEXT, TABLE_SELECTION_BACKGROUND_COLOR } from '../../constants';
import { IGroupDTO } from '../../interfaces';
import { GroupApi } from '../../api';

export class GroupListView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      pageSize: 20,
      groupsList: [],
      selectedID: null
    };
  }

  public async componentDidMount(): Promise<void> {
    this.setState({loading: true, selectedID: null, pageSize: 20});

    const groupsList: IGroupDTO[] = await GroupApi.getGroupsList();
    this.setState({groupsList, loading: false});
  }

  @autobind
  public getTrProps(table: object, row: RowInfo): object {
    const onClick: () => void = (): void => {
      this.props.onSelect(row.original.id);
    };

    const style: React.CSSProperties = {
      background:
        (row && this.state.selectedID === row.original.id) ? TABLE_SELECTION_BACKGROUND_COLOR : 'inherit'
    };

    return {onClick, style};
  }

  public getGroupsTable(): JSX.Element {
    return (
      <ReactTable
        columns={COLUMNS}
        data={this.state.groupsList}
        loading={this.state.loading}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        getTrProps={this.getTrProps}
      />
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header size="large">{GROUP_TEXT.GROUPS_HEADER}</Header>
        <Grid.Row columns="equal">
          <Grid.Column>
            {this.getGroupsTable()}
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}

const COLUMNS: Column[] = [
  {Header: 'ID', accessor: 'id'},
  {Header: 'Name', accessor: 'name'},
];

export interface IProps {
  onSelect(groupID: number): void;
}

export interface IState {
  readonly loading: boolean;
  readonly pageSize: number;
  readonly groupsList: IGroupDTO[];
  readonly selectedID: number;
}
