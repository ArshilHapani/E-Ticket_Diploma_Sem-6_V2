import React from "react";
import "./style.css";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="parent">
          <h5 className="h5">Internal Server error !</h5>
          <h1 className="h1">5</h1>
          <h1 className="h1">00</h1>
          <div className="box-error">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="box-error">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="p">
            {" "}
            We're unable to find out what's happening! We suggest you to
            <br />
            <a className="a" href="https://e-ticket-user.netlify.app/signIn">
              Sign in again{" "}
            </a>
            or refresh this page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
