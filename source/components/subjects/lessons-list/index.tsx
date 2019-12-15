import React, { Component } from 'react';
import { Button, Grid, Header, Icon, Item, Segment } from 'semantic-ui-react';
import { ICardDTO, IState as IStore } from '../../../interfaces';
import { isUserStudent } from '../../../selectors/user';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CARD_TYPES_TITLES } from '../../../enums';

class LessonsList extends Component<IProps> {

  public renderCardsList = () => {
    const { cards, subjectID } = this.props;

    if (!cards.length) {
      return (
        <Segment placeholder style={{ width: '100%', textAlign: 'center' }}>
          <Header icon>
            <Icon name="file outline"/>
            Навчальні кадри ще відсутні для даного предмету
          </Header>
        </Segment>
      );
    }

    return (
      <Item.Group divided>
        {cards.map((i: ICardDTO) => (
          <Item>
            <Item.Content>
              <Item.Header>
                <Link
                  to={`/subjects/${subjectID}/${i.type?.toLowerCase()}-card/${i.uuid}`}
                >
                  {i.title}
                </Link>
              </Item.Header>
              <Item.Meta>{i.type && CARD_TYPES_TITLES[i.type]}</Item.Meta>
              <Item.Description
                dangerouslySetInnerHTML={{
                  __html: i.content.length > 150
                    ? `${i.content.substring(0, 150)}...`
                    : i.content
                }}
              />
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }

  public render(): JSX.Element {
    const { isAdmin, subjectID } = this.props;

    return (
      <Grid style={{ marginTop: 30 }}>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as={'h5'}>Список інформаційних та тестових кадрів</Header>
          </Grid.Column>
          {
            isAdmin && (
              <Grid.Column width={4}>
                <Link to={`/subjects/${subjectID}/add-info-card`}>
                  <Button primary content="Додати інформаційний кадр"/>
                </Link>
              </Grid.Column>
            )
          }
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            {this.renderCardsList()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  isAdmin: !isUserStudent(state),
  subjectID: state.subjects.currentSubject.uuid,
  cards: state.subjects.currentSubject.cards
});

export default compose(
  connect(mapStateToProps)
)(LessonsList);

interface IProps {
  readonly isAdmin: boolean;
  readonly subjectID: string;
  readonly cards: ICardDTO[];
}
