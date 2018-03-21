import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/Game/Player'
import HealthBar from '../../components/Game/HealthBar'
import {updateAttackType} from '../../actions/games'
import {connect} from 'react-redux'

//STYLING
import './BattleArena.css'
import './classesCss/mage.css'
import './classesCss/fighter.css'
import './classesCss/fighter.css'

export class BattleArena extends PureComponent {
  static propTypes = {
    background: PropTypes.string.isRequired,
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }
  state = {
    playerStatus :'idle',
    player1AttackType:'none',
    player2AttackType:'none'
  }

calulatePercentage = (totalDamage) => {
  const fullHealth = 10
  return ((fullHealth-totalDamage)*(fullHealth))
}

togglePlayerState = (stateString) => {
  this.setState({
    playerStatus: stateString
  })
}

togglePlayer1AttackType = (attacktype) => {
  this.setState({
    player1AttackType: attacktype
  })
}

togglePlayer2AttackType = (attacktype) => {
  this.setState({
    player2AttackType: attacktype
  })
}


timerPlayer1AttackType = (x, y) => {
  setTimeout(_ => this.togglePlayer1AttackType(x), y);
}

timerPlayer2AttackType = (x, y) => {
  setTimeout(_ => this.togglePlayer2AttackType(x), y);
}

timerPlayerState = (x, y) => {
  setTimeout(_ => this.togglePlayerState(x), y);
}

timerIdleCheck = (y) => {
  setInterval(_ => this.moveChecker(), y);
}

moveChecker = () => {
  if (this.state.playerStatus === 'idle' && this.props.player1.pendingMove !== null && this.props.player2.pendingMove !== null){
    this.togglePlayerState('move')
  }
}

  render() {
    console.log(this.props.player1)
    console.log(this.props.player2)
    return (
      <div>
      <div className={`fieldOverlay`}>
      </div>
      <div>
      {this.props.player1 !== undefined && this.props.player2 !== undefined &&
        <div className={this.props.background}>
        {this.props.player1 !== 'undefined' && this.props.player2 !== 'undefined' &&
          <div>
            <HealthBar side='left' percentage={this.props.player1.hp*10}/>
            <HealthBar side='right' percentage={this.props.player2.hp*10}/>

            {this.state.playerStatus === 'idle' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player1.pendingMove}/>

              <Player side='right'character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player2.pendingMove}/>

                {this.togglePlayer1AttackType(this.props.player1.pendingMove)}
                {this.togglePlayer2AttackType(this.props.player2.pendingMove)}
                {this.timerIdleCheck(180)}
            </div>
            }
            {this.state.playerStatus === 'move' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.state.player1AttackType}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.player1AttackType}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.state.player2AttackType}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.player2AttackType}/>
                {this.timerPlayerState('attack', 450)}
            </div>
            }
            {this.state.playerStatus === 'attack' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.state.player1AttackType}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.player1AttackType}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.state.player2AttackType}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.player2AttackType}/>
                {this.timerPlayerState('moveback', 400)}
            </div>
            }
            {this.state.playerStatus === 'moveback' &&
            <div>
              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.state.player1AttackType}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.player1AttackType}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.state.player2AttackType}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.player2AttackType}/>
                {this.timerPlayerState('idle', 450)}

                {this.timerPlayer1AttackType(this.props.player1.pendingMove, 460)}
                {this.timerPlayer2AttackType(this.props.player2.pendingMove, 460)}
            </div>
            }
          </div>
        }
        </div>
      }
      </div>
      </div>
    )
  }
}
const mapDispatchToProps = {
  updateAttackType
}

export default connect(null, mapDispatchToProps)(BattleArena)
