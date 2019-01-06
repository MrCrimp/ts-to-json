import { componentNames } from "./resolve-files";
import { Project, SourceFile } from "ts-simple-ast";
import { ResultBuilder } from "./result";
import { Arguments } from './options';
import { warn } from './log';
import { log } from './log';
import { getNodeInfo } from './nodes';

export const getInterfaces = (
  project: Project, 
  folders: string[], 
  moduleNames: string[]) => {

  //TODO: module.{sourcefile, folder, name}

  const builder = new ResultBuilder();

  //TODO Move file concerns out
  folders.forEach((folder, i) => {

    //const sourcefile = sourceFiles[i];
    const sourcefile =
    project.getSourceFile(`${folder}.tsx`) ||
    project.getSourceFile(`${folder}.ts`);

    if (!sourcefile) {
      //TODO: add incompatible to result
      warn( `${folder}.ts* not found` );
      return;
    }
    
    log(sourcefile);

    const matchingInterfaces = sourcefile.getInterfaces();

    if (!matchingInterfaces || !matchingInterfaces.length) {
      return;
    }

    matchingInterfaces.forEach( match => {

      const members = match.getMembers().map(m => [

        m.getSymbol().getName(),

        getNodeInfo(m) 
          
      ]);

      const module = {
          name: match.getName(),
          moduleName: moduleNames[i],
          meta: getNodeInfo(match),
          members: []
      }

      members
        .forEach(member => {
          const [name, docs] = member as any;
          module.members.push({
              name,
              meta: docs,
              __documented: !!docs.text,
              __internal: (Array.isArray(docs) && 
              docs.length &&
              docs.some(d=>
                d.tags.some(t=>t.name === '@internal') ||
                d.tags.some(t=>t.name === '@private')
              ))
          });

      });

      builder.add(module);
    });

  });

  return builder.result;
};
