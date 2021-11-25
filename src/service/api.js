import axios from "axios";

export const getDirInfo = () =>
  axios.get(`https://dev21.becollective.com/api/v2/coding-challenges/dirs`);
