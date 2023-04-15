import axios from "axios";

const Request = axios.create({
  baseURL: "http://localhost:3000",
});

export default Request;
