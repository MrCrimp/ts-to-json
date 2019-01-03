import * as fs from 'fs';
 
export const validateFolder = path => fs.statSync(path).isDirectory()