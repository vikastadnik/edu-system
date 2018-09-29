import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { GroupsListContainer } from '../../containers/groups-list';

export class GroupsAndStudentList extends React.Component {
  constructor(props: object) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <GroupsListContainer/>
          </Grid.Column>
          <Grid.Column/>
        </Grid.Row>
      </Grid>
    );
  }
}
