const React = window.React;
const ReactDOM = window.ReactDOM;
const { BrowserRouter, Route, Switch } = window.ReactRouterDOM;

const Home = () => (
  <div className="container">
    <h1>Welcome to Discord Tool</h1>
    <p>This tool offers various features like sending messages, viewing profiles, and more.</p>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));