import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Footer from "./components/src/footer";
import Navigator from "./components/src/navigator";
import Loader from "./components/src/loader";
import { useRouterGA } from "./components/src/google-analytics";

const load = (Component) => (props) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

const Home = load(lazy(() => import("./home")));
const Marvel = load(lazy(() => import("./marvel")));

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Navigator></Navigator>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/marvel">
                    <MarvelPage />
                </Route>
            </Switch>
            <Footer></Footer>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

function HomePage(props) {
    useRouterGA();
    return <Home />;
}

function MarvelPage(props) {
    useRouterGA();
    return <Marvel />;
}
