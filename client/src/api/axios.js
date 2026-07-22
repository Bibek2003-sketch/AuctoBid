// =======================================================
// Axios Configuration
//
// This file creates one Axios instance.
// Every API request will use this instance.
//
// If the backend URL changes later,
// we only change it here.
// =======================================================

import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:3000/api",

});

export default API;