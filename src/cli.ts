import * as spinner from 'ora';
import { parseInterfaces } from './interface-parser';
import { inferOptions } from './options';
import * as fs from 'fs';
import { stringify } from './json';
import { getProject, ProjectOptions } from './project';
const terminal_line = '____________________________\n';
export const showProgress = ()=> spinner('Working...').start();

const [
  targetDirectory, 
  tsConfigPath, 
  outfile = 'result.json',
  interfaceNameGlob = ['*']
] = process.argv.slice(2);

const progress = showProgress();

const options = inferOptions({
  targetDirectory,
  tsConfigPath
});

const project = getProject(options as ProjectOptions);

const result = parseInterfaces(project, options);

outfile && fs.writeFileSync(outfile, stringify(result));

//TODO: chalk

progress.succeed("Done.");

console.log(outfile 
  ? 
    `✔ Json written to ${outfile}` 
  : 
    "No outfile was provided"
)

console.log(terminal_line)

process.exit();