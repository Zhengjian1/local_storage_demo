import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from "./components/loading";

const Home = lazy(() => import('./pages/home'));
const ScrollTest = lazy(() => import('./pages/scroll-test'));

const handleSuspense = (Component) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
);

const pages = [
    { path: '/test', component: ScrollTest },
    { path: '/', component: Home },
];

const renderRoutes = pages.map((item => (
    <Route path={item.path} key={item.path}>
        {handleSuspense(item.component)}
    </Route>
)))

const routes = (
    <Router>
        <Switch>
            {renderRoutes}
        </Switch>
    </Router>
)

export default routes;