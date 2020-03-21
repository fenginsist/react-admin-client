import React from "react";
import ReactDom from "react-dom"

import App from './app'

import memoryUtils from "./utils/memoryUtils";
import localStorageUtils from "./utils/localStorageUtils";

memoryUtils.user = localStorageUtils.getUser();

ReactDom.render(<App/>, document.getElementById('root'))
