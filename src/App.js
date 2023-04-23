import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Homepage/Home";
import { Page } from "./components/Page/Page";
import { ContactFormPage } from "./components/ContactPage/ContactFormPage";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AppContext from "./data";

const App = () => {
  AppContext.domain = "https://bsva-cms.herokuapp.com";
  AOS.init();
  return (
    <div data-aos="fade-in">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={ContactFormPage} />
          <Route path="/:slug" component={Page} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
