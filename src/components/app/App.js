import { HashRouter, Route, Switch } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import { ComicsPage, MainPage, Page404, SingleComicPage } from '../pages';


const App = () => {

    return (
        <HashRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path='/'>
                            <MainPage />
                        </Route>

                        <Route exact path='/comics'>
                            <ComicsPage />
                        </Route>

                        <Route exact path='/comics/:comicId'>
                            <SingleComicPage />
                        </Route>

                        <Route exact path='*'>
                            <Page404 />
                        </Route>
                    </Switch>
                </main>
            </div>
        </HashRouter>
    )
}

export default App;