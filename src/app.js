import { webFrame } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore, RouterStore } from 'mobx-react-router';
import { Router, Route, hashHistory } from 'react-router';
import App from "./component/app/App";
import Websites from './component/app/Websites'

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

window.addEventListener('load', () => {
    const router = new RouterStore();
    const history = syncHistoryWithStore(hashHistory, router);
    window.unanleon = {
        render() {
            const preparedApp = (
                <Router history={history}>
                    <Route path={'/'} component={App} />
                    <Route path={'/website/:url'} component={Websites} />
                </Router>
            );
            render(preparedApp, document.getElementById('root'));
        },
    };
    window.unanleon.render();
});

window.addEventListener('dragover', event => event.preventDefault());
window.addEventListener('drop', event => event.preventDefault());
window.addEventListener('dragover', event => event.stopPropagation());
window.addEventListener('drop', event => event.stopPropagation());
