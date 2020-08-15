import React, { Suspense } from 'react';
import {Switch, Route, Redirect, HashRouter} from 'react-router-dom';

const Users = React.lazy(() => import('./components/Users/Users'));
const UserDetail = React.lazy(() => import('./components/Users/UserDetails'));
const Posts = React.lazy(() => import('./components/Posts/Posts'));

export function App() {
    function renderUserPage(routeProps) {
        return(
            <Suspense fallback={<div>Loading your ass</div>}>
                <Users routerProps={routeProps}/>
            </Suspense>
        );
    }

    function renderUserDetailsPage(routeProps) {
        return(
            <Suspense fallback={<div>Loading your ass</div>}>
                <UserDetail routerProps={routeProps}/>
            </Suspense>
        );
    }

    function renderPosts(routerProps) {
        return(
            <Suspense fallback={<div>Loading your ass</div>}>
                <Posts routerProps={routerProps}/>
            </Suspense>
        );
    }

    return(
        <>
            <header>
                <h1>Fast Blog</h1>
            </header>
            <main>
                <HashRouter>
                    <Switch>
                        <Route path="/users/" exact={true} render={renderUserPage}/>
                        <Route path="/users/:id/" exact={true} render={renderUserDetailsPage}/>
                        <Route path="/users/:id/posts/" exact={true} render={renderPosts}/>
                        <Redirect to="/users/"/>
                    </Switch>
                </HashRouter>
            </main>
        </>
    );
}