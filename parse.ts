
import { configure } from "./config";
import { getInterfaces } from "./ast";

export const parse = (args)=>{
  
  const interfaces = getInterfaces(configure(args));

  return toJSON(interfaces);
}

function toJSON(obj){
  return JSON.stringify(obj);
}