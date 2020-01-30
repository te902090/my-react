import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Home, Create, Backlog, Bug, Epic ,Dashboard, Notifications} from "./pages";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/backlog" component={Backlog} />
      <Route exact path="/bug" component={Bug} />
      <Route exact path="/epic" component={Epic} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/notifications" component={Notifications} />
    </Switch>
  </main>
);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        { 
          path: "/create", 
          text: "Create", 
          isActive: false, 
          icon: "fa-clone",
          isExpanded: false,
          subLinks: [
            { path: "/backlog", text: "Backlog", isActive: false, icon: "fa-tasks" },
            { path: "/bug", text: "Bug", isActive: false, icon: "fa-edit" },
            { path: "/epic", text: "Epic", isActive: false, icon: "fa-compress" },
          ]
        },
        { path: "/dashboard", text: "Dashboard", isActive: false, icon: "fa-envelope", isExpanded: false, },
        { path: "/notifications", text: "Notifications", isActive: false, icon: "fa-comments", isExpanded: false, }
      ],
      expanded: false
    };
  }
  onHover = () => {
    this.setState({ expanded: true });
  };

  onLeave = () => {
    this.setState((prevState) => {
      const newLinks = prevState.links.map(item => { 
        return {
          ...item, 
          isExpanded: false
        }
      });
      return {
        links: newLinks,
        expanded: false
      }
    });
  };

  toggleSubMenu = (i) => {
    this.setState((prevState) => {
      const newLinks = [...prevState.links];
      newLinks[i].isExpanded = !prevState.links[i].isExpanded
      return {
        links: newLinks,
      }
    });
  }

  render() {
    return (
      <div>
        <nav
          className={`navbar ${this.state.expanded ? "expanded" : ""}`}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onLeave}
        >
          <div className="logo">
            <h1 className="site-logo-title">Pega</h1>
            <div className="site-logo-app">AgileStudio Cosmos</div>
          </div>
          <div className="search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" id="search-text" placeholder="Search" />
          </div>
          <div role="menu" className="side-nav">
            <div role="presentation" className="sidenav-navitem">
              {this.state.links.map((link, i) => (
                <NavLink
                  role="menuitem"
                  tabIndex="0"
                  path={link.path}
                  text={link.text}
                  isActive={link.isActive}
                  subLinks={link.subLinks}
                  key={link.path}
                  icon={link.icon}
                  subMenuExpanded={link.isExpanded}
                  toggleSubMenu={()=>this.toggleSubMenu(i)}
                />
              ))}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

const NavLink = (props) => {
    return (
      <div
        className="nav-item"
        role="menuitem"
        tabIndex="0"
      >
        <Link className="nav-link" to={props.path}>
          <div className="navicon">
            <i className={`fa fa-fw ${props.icon}`}/>
          </div>
          <div title={props.text} className="navtext" onClick={props.toggleSubMenu}>
            <div className="navtext-label">{props.text}</div>
            {
              props.subLinks 
                  && (<div className="navtext-expandicon"><i className={`fa fas ${props.subMenuExpanded? 'fa-chevron-up': 'fa-chevron-down'}`}></i></div>)
            }
          </div>
          
        </Link>
        {
          props.subLinks && <NavSubLinkContainer links={props.subLinks} show={props.subMenuExpanded}/>
        }
      </div>
    );
}

const NavSubLinkContainer = (props) => (
  <div className={`nav-submenu-container ${props.show? 'expanded': ''}`}>
  {
    props.links && props.links.map((link, i) => (
      <NavSubLink
        role="menuitem"
        tabIndex="0"
        path={link.path}
        text={link.text}
        isActive={link.isActive}
        key={link.path}
        icon={link.icon}
        subMenu
      />
    ))
  }
  </div>
);

const NavSubLink = (props) => {
    return (
      <div
        className="nav-submenu-item"
        role="menuitem"
        tabIndex="0"
      >
        <Link className="nav-link" to={props.path}>
          <div className="navicon">
            <i className={`fa fa-fw ${props.icon}`}></i>
          </div>
          <div title={props.text} className="navtext">
            {props.text}
          </div>
        </Link>
      </div>
    );
}

export default App;
