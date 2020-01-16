import React, { Component } from 'react';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Grid, Header, Loader } from 'semantic-ui-react';
import { ICardDTO, IState as IStore, ISubjectDTO } from '../../../interfaces';
import { RouteConfigComponentProps } from 'react-router-config';
import { setCurrentSubject } from '../../../actions/subjects/thunks';
import { CARD_TYPES } from '../../../enums';

class InfoCard extends Component<IProps, IState> {

  public static getDerivedStateFromProps(nextProps: IProps) {
    if (nextProps.currentSubject) {
      return { card: nextProps.currentSubject?.cards.find((c) => c.uuid === nextProps.match.params.cardId) };
    }
    return null;
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      card: this.props.currentSubject?.cards.find((c) => c.uuid === this.props.match.params.cardId),
      loading: false
    };
  }

  public async componentDidMount() {
    const { currentSubject, match: { params: { subjectId } } } = this.props;
    if (!currentSubject) {
      this.props.setCurrentSubject(subjectId);
    }
  }

  public render(): JSX.Element {
    const { match: { params: { subjectId } } } = this.props;
    const { card, loading } = this.state;
    if (loading || !card) {
      return <Loader size="large"/>;
    }
    return (
      <Container>
        <Grid style={{ marginTop: 30 }}>
          <Grid.Row>
            <Grid.Column>
              <Header as={'h5'} dividing style={{ width: '100%' }}>{card.title}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div dangerouslySetInnerHTML={{ __html: card.content }}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column style={{ justifyContent: 'flex-end', display: 'flex' }}>
              {card.parentType && card.parentUuid &&
              <Link to={`/subjects/${subjectId}/${card.parentType?.toLowerCase()}-card/${card.parentUuid}`}>
                <Button icon="left arrow" labelPosition="left" content="Попередній урок"/>
              </Link>}

              {card.nextType && card.nextUuid &&
              <Link to={`/subjects/${subjectId}/${card.nextType?.toLowerCase()}-card/${card.nextUuid}`}>
                <Button
                  content={card.nextType === CARD_TYPES.INFO ? 'Наступний урок' : 'Перейти до тесту'}
                  icon="right arrow"
                  labelPosition="right"
                />
              </Link>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  currentSubject: state.subjects.currentSubject
});

const mapDispatchToProps = { setCurrentSubject };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(InfoCard);

type IProps =
  RouteConfigComponentProps<{ cardId: string, subjectId: string }>
  & { currentSubject: ISubjectDTO; setCurrentSubject(data): void; };

interface IState {
  readonly card: ICardDTO;
  readonly loading: boolean;
}
