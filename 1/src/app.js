/**
 * By Luis Solorzano
 */

import { remote, webFrame } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { syncHistoryWithStore, RouterStore } from 'mobx-react-router'
import { Router, Route, hashHistory } from 'react-router'
import App from './component/app/App'
import Websites from './component/app/Websites'
import * as firebase from 'firebase'
import ServerApi from './api/server/ServerApi'

const config = {
  apiKey: 'AIzaSyAXsZvK07C5oIseGS77tQx5J2tUl6a3a9k',
  authDomain: 'unanleon-abdd8.firebaseapp.com',
  databaseURL: 'https://unanleon-abdd8.firebaseio.com',
  projectId: 'unanleon-abdd8',
  storageBucket: '',
  messagingSenderId: '1059870077207'
}
firebase.initializeApp(config)

webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

window.addEventListener('load', () => {
  const api = new ServerApi()

  const router = new RouterStore()
  const history = syncHistoryWithStore(hashHistory, router)
  window.unanleon = {
    api,
    render () {
      const preparedApp = (
        <Router history={history}>
          <Route path={'/'} component={App}/>
          <Route path={'/website/:url'} component={Websites}/>
        </Router>
      )
      render(preparedApp, document.getElementById('root'))
    },
  }
  window.unanleon.render()
})

window.addEventListener('dragover', event => event.preventDefault())
window.addEventListener('drop', event => event.preventDefault())
window.addEventListener('dragover', event => event.stopPropagation())
window.addEventListener('drop', event => event.stopPropagation())
