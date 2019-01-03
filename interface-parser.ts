
import { inferOptions, Arguments } from "./options";
import { getInterfaces } from "./ast";

export const parseToJSON = (args:Arguments)=>{
  
  const interfaces = getInterfaces(args);

  return JSON.stringify(interfaces,null,3);
}
