import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import NavBar from "../components/common/navbar/Navbar";
import Services from "./Services";
import FooterSection from "../components/Home/footerSection";
import "../App/App.css";
class App extends Services {
  render() {
    return (
      <BrowserRouter>
        <NavBar items={this.state.navBarItems} user={this.state.user} />
        <Switch>{this.state.Routes.map(item => item.Route)}</Switch>
        <FooterSection />
      </BrowserRouter>
    );
  }
}

export default App;
