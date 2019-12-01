import * as React from 'react';
import { Button,  Grid } from 'semantic-ui-react';
import GroupList from '../../components/groups/group-list';
import { ErrorHandler } from '../error-handler';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IGroupDTO, IState } from '../../interfaces';
import { getSelectedGroup } from '../../selectors/groups';
import * as groupsThunks from '../../actions/groups/thunks';
import { noop } from 'lodash-es';

class GroupsAndStudentList extends React.Component<IProps> {

  public render(): JSX.Element {
    return (
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <GroupList/>
          </Grid.Column>
          <Grid.Column/>
        </Grid.Row>

        <Grid.Row columns="equal">
          <Grid.Column>
            <Button
              content="Редагувати групу"
              disabled={!this.props.selectedGroup?.uuid}
              primary
              fluid
            />
          </Grid.Column>

          <Grid.Column>
            <Button
              content={'Видалити групу'}
              disabled={!this.props.selectedGroup?.uuid}
              onClick={() => this.props.deleteSpeciality(this.props.selectedGroup?.uuid)}
              secondary
              fluid
            />
          </Grid.Column>

          <Grid.Column>
            <Button
              content={'Додати студентів'}
              disabled={!this.props.selectedGroup?.uuid}
              onClick={noop}
              fluid
            />
          </Grid.Column>

          <Grid.Column>
            <Button
              content={'Видалити студентів'}
              disabled={!this.props.selectedGroup?.uuid}
              onClick={noop}
              fluid
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <ErrorHandler error={this.props.error?.message}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  error: state.groups.error,
  selectedGroup: getSelectedGroup(state)
});

const mapDispatchToProps = {
  deleteSpeciality: groupsThunks.deleteGroup,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(GroupsAndStudentList);

export interface IProps {
  readonly error: any;
  readonly selectedGroup: IGroupDTO;

  deleteSpeciality(uuid: string): void;
}
