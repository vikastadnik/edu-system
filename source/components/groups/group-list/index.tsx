import * as React from 'react';
import ReactTable, { Column, RowInfo } from 'react-table';
import { Header } from 'semantic-ui-react';
import { DEFAULT_PAGE_SIZE, GROUP_TEXT, TABLE_SELECTION_BACKGROUND_COLOR } from '../../../constants';
import { IGroupDTO, IState } from '../../../interfaces';
import { AxiosError } from 'axios';
import AddEditGroupModal from '../add-edit-group';
import * as groupsThunks from '../../../actions/groups/thunks';
import * as groupsActions from '../../../actions/groups';
import { compose } from 'redux';
import { connect } from 'react-redux';

class GroupList extends React.Component<IProps> {

  public componentDidMount(): void {
    if (!this.props.list.length) {
      this.props.fetchGroups();
    }
  }

  public getTrProps = (table: object, row: RowInfo) => {
    const { selectedGroupUuid } = this.props;
    const onClick = () => {
      this.props.selectGroup(selectedGroupUuid === row.original.uuid ? null : row.original.uuid);
      this.props.fetchGroupStudentList();
    };

    const style: React.CSSProperties = {
      background:
        (row && selectedGroupUuid === row.original.uuid) ? TABLE_SELECTION_BACKGROUND_COLOR : 'inherit'
    };

    return { onClick, style };
  }

  public render(): JSX.Element {
    return (
      <>
        <Header size="large">{GROUP_TEXT.GROUPS_HEADER}
          <AddEditGroupModal/>
        </Header>

        <ReactTable
          columns={COLUMNS}
          data={this.props.list}
          loading={this.props.fetching}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          showPageSizeOptions={false}
          resizable={false}
          getTrProps={this.getTrProps}
        />
      </>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  fetching: state.groups.fetching,
  list: state.groups.list,
  error: state.groups.error,
  selectedGroupUuid: state.groups.selectedUuid
});

const mapDispatchToProps = {
  fetchGroups: groupsThunks.fetchGroups,
  selectGroup: groupsActions.groupsSelect,
  fetchGroupStudentList: groupsThunks.fetchGroupStudentList,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(GroupList);

export interface IProps {
  readonly fetching: boolean;
  readonly list: IGroupDTO[];
  readonly error: AxiosError;
  readonly selectedGroupUuid: string;

  fetchGroups(): void;

  selectGroup(uuid: string): void;

  fetchGroupStudentList(): void;
}

const COLUMNS: Column[] = [
  { Header: 'Номер групи', accessor: 'name', width: 150 },
  { Header: 'Спеціальність', accessor: 'specialty.name' },
  { Header: 'Курс', accessor: 'course', width: 75 },
];
