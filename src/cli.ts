import * as spinner from 'ora';
import * as fs from 'fs';
import { parseInterfaces } from './interface-parser';
import { inferOptions } from './options';
import { stringify } from './json';
import { getProject, ProjectOptions } from './project';

const terminal_line = '____________________________\n';

export const showProgress = ()=> {
  console.clear();
  console.log('\x1Bc');
  return spinner('Working...').start();
}

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

if(!result || !result.length){
  progress.fail('Result contained no entries. This might be caused by a invalid target folder.')
  console.log(terminal_line);
  console.error('### Current arguments: ###\n', JSON.stringify(options, null, 3));
  console.log(terminal_line);
  process.exit(1);
}

progress.succeed('Done');

console.log(outfile 
  ? 
    `✔ Json written to ${outfile}` 
  : 
    "No outfile was provided"
)

console.log(terminal_line)

process.exit();