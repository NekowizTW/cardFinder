import React    from 'react'
import url      from 'url'
import location from 'location-href'
import _        from 'lodash'
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

import Action from './Redux/Action.js'
import CardSnap from './Helper/CardSnap.js'

import CardCollec from './Container/CardCollec.Container.js'
import CardDetail from './Container/CardDetail.Container.js'
import TeamCollec from './Container/TeamCollec.Container.js'

import './assets/css/main.scss'

const url_parse = url.parse(location(), true);
const path = url_parse.href.replace(url_parse.hash, '');
const pageState = url_parse.hash;

class NoMatch extends React.Component{
  constructor () {
    super();
  }
  render () {
    return <Redirect to='/' />
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  componentDidMount () {
    const _this = this
    CardSnap(path)
      .then((data) => {
        Action.initCardData({
          card: data.card,
          senzai: data.Senzai
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
          <Route exact path='/' component={CardCollec} />
          <Route exact path='/card/:cardId' component={CardDetail} />
          <Route exact path='/team/form' component={TeamCollec}/>
          <Route exact path='/team/group/:hex' component={TeamCollec}/>
          <Route path='*' component={NoMatch} />
        </HashRouter>
      );
  }
}
export default App
