import { createContext, useContext } from "react";

export const MessageContext = createContext({
  msg: "",
  setMsg: () => {},
});

export const useMessage = () => useContext(MessageContext);
