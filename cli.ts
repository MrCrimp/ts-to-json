import * as parseArguments from 'minimist';
import * as spinner from 'ora';
import { parse } from './parse';

export const commandlineArgs = parseArguments(process.argv.slice(2));

export const showProgress = ()=> spinner('Working...').start();

parse(commandlineArgs);