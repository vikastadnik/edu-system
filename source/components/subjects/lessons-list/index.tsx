import React, { Component } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { IState as IStore } from '../../../interfaces';
import { isUserStudent } from '../../../selectors/user';
import { compose } from 'redux';
import { connect } from 'react-redux';

class LessonsList extends Component<IProps> {
  public render(): JSX.Element {
    const { isAdmin } = this.props;

    return (
      <Grid style={{ marginTop: 30 }}>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as={'h5'}>Список інформаційних та тестових кадрів</Header>
          </Grid.Column>
          {
            isAdmin && (
              <Grid.Column width={4}>
                <Button primary onClick={() => this.setState({ editMode: true })}>Додати кадр</Button>
              </Grid.Column>
            )
          }
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  isAdmin: !isUserStudent(state),
  specialities: state.specialities.list
});

export default compose(
  connect(mapStateToProps)
)(LessonsList);

interface IProps {
  readonly isAdmin: boolean;
}
