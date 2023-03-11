import React from "react";
import { Link } from "react-router-dom";
import {GlobalCont} from "./style/error.js"


const Error = () => {
  return (
        <GlobalCont>
        <div className="textCont">
          <h1>404</h1>
          <p>Il semblerait que cette page n'existe pas</p>
          <Link to="/">Home</Link>
        </div>
      </GlobalCont>
  )
}

export default Error