import axios from "axios";
 export default axios.create({ baseURL: "http://localhost:3036" });
//  const res = await axios.post("/register", userData);
//  const { data } = await axios.post("/register", userData);
