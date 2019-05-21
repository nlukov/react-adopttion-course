// mostly code from the Reactjs docs (reactjs.org/docs/error-boundries.html)

import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Error Boundary caught an error", error, info);
  }

  //timer function using componentDidUpdate (5000ms = 5s)
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing.{" "}
          <Link to="/">Click here to go back to home page or wait 5s.</Link>
        </h1>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
