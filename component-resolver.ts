import * as fs from 'fs';
import { camelCased } from './utils';

const getDirectories = parentDirectory => fs.readdirSync(parentDirectory)
                                            .filter(
                                              folder => fs.statSync(parentDirectory+'/'+folder).isDirectory()
                                            );

export const componentFolders = (dir, exclude) => getDirectories(dir).filter( c => exclude.indexOf(c) === -1 );

export const componentNames = (dir, exclude) => [ componentFolders(dir,exclude), componentFolders(dir,exclude).map(camelCased) ];
