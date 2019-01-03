import * as parseArguments from 'minimist';
import * as spinner from 'ora';
import { parseToJSON } from './interface-parser';
import { inferOptions } from './options';

const [targetDirectory, tsConfigPath] = process.argv.slice(2);

export const showProgress = ()=> spinner('Working...').start();

const result = parseToJSON(
  inferOptions( {
    targetDirectory,
    tsConfigPath
  })
);

console.log(result)