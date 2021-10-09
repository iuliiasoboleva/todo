import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Nav from "../Nav/Nav"
import Form from "../Form/Form";
import Task from "../Task/Task";
import { Provider } from "react-redux"
import List from "../List/List";
import Login from "../Login/Login";
import store from "../../redux/store"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Nav />

        <Switch>
          <Route exact path="/">
            <Form />
            <List />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="/:id" exact>
            <Task />
          </Route>

        </Switch>
      </Router>
    </Provider>
  )
}

export default App
