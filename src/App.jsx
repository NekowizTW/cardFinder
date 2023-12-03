import React         from 'react'
import _             from 'lodash'
import { HashRouter,
         Switch,
         Route,
         Link,
         Redirect }  from 'react-router-dom'

import Action from './Redux/Action'
import CardSnap from './Helper/CardSnap'

import CardCollec from './Container/CardCollec'
import CardDetail from './Container/CardDetail'
import TeamCollec from './Container/TeamCollec'
import EXCollec   from './Container/EXCollec'

import 'purecss-sass'
import './assets/css/main.scss'

const path = 'https://nekowiztw.github.io/wikidata-sync/cards/'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  componentDidMount () {
    const _this = this
    CardSnap(path, ['卡片資料', '結晶', '大結晶'])
      .then(dataArr => {
        Action.initCardData({
          card: dataArr[0].card,
          senzai: dataArr[0].Senzai,
          exCard: dataArr[1],
          leaderEXCards: dataArr[2]
        })
        _this.setState({ isLoading: false })
      })
  }

  render() {
    if (this.state.isLoading)
      return <p id={'loading___'}>資料載入中 :3 </p>
    else
      return (
        <HashRouter>
          <Switch>
            <Route exact path='/' component={CardCollec} />
            <Route path='/card/:cardId' component={CardDetail} />
            <Route exact path='/team' component={TeamCollec}/>
            <Route path='/team/:code' component={TeamCollec}/>
            <Route exact path='/ex' component={EXCollec} />
            <Redirect from="*" to="/" />
          </Switch>
        </HashRouter>
      );
  }
}
export default App
