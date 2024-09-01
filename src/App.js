import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  country = 'us';
  pageSize = 18;
  render() {
    return (
      <Router>
        <NavBar />
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<News key="general" pageSize={this.pageSize} country={this.country} category="general" />} />
            <Route path="/business" element={<News key="business" pageSize={this.pageSize} country={this.country} category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country={this.country} category="entertainment" />} />
            <Route path="/general" element={<News key="general" pageSize={this.pageSize} country={this.country} category="general" />} />
            <Route path="/health" element={<News key="health" pageSize={this.pageSize} country={this.country} category="health" />} />
            <Route path="/science" element={<News key="science" pageSize={this.pageSize} country={this.country} category="science" />} />
            <Route path="/sports" element={<News key="sports" pageSize={this.pageSize} country={this.country} category="sports" />} />
            <Route path="/technology" element={<News key="technology" pageSize={this.pageSize} country={this.country} category="technology" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
