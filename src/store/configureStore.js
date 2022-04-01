import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import reducer from "./reducer";

export default function () {
  return configureStore({
    reducer,
  });
}
