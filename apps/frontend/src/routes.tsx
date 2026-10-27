import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routeBuilder, { ROUTES } from "@web-core/component/src/service/routeBuilder";
import TodoPage from "@web-core/component/src/pages/todo/TodoPage";
import "@web-core/asset/styles/app.scss";

function Routes() {
  const route = (routeName: ROUTES) => routeBuilder(routeName).route;

  return (
    <div className="App">
      <Switch>
        <Route exact path={route(ROUTES.home)}>
          <TodoPage />
        </Route>
        <Route>
          <Redirect to={route(ROUTES.home)} />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
