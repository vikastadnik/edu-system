import * as React from 'react';
import ReactTable, { Column, RowInfo } from 'react-table';
import { Button, Container, Header } from 'semantic-ui-react';
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
    const COLUMNS: Column[] = [
      { Header: 'Номер групи', accessor: 'name' },
      { Header: 'Спеціальність', accessor: 'specialty.name', width: 150 },
      { Header: 'Курс', accessor: 'course', width: 75 },
      {
        Header: '',
        Cell: (row: any) => (
          <div style={{ textAlign: 'center' }} className="table-buttons">
            <Button.Group>
              <Button icon="edit" primary> Редагувати </Button>
              <Button
                icon="remove"
                onClick={() => this.props.onDeleteGroup(row.original)}
              >
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
    return (
      <Container>
        <Header size="large">{GROUP_TEXT.GROUPS_HEADER}
          <AddEditGroupModalContainer mode={'ADD'}/>
        </Header>
        {this.getGroupsTable()}
        <ErrorHandler error={this.props.error}/>
      </Container>
    );
  }
}

export interface IProps {
  readonly loading: boolean;
  readonly groupsList: IGroupDTO[];
  readonly error: AxiosError;

  onSelect(groupID: number): void;

  onDeleteGroup(group: IGroupDTO): void;
}

export interface IState {
  readonly selectedID: number;
}
