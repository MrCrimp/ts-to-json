import { componentNames } from "./file-resolvers";
import { Project } from "ts-simple-ast";
import { ResultBuilder } from "./result";
import { Arguments } from './options';
import * as mm from 'micromatch';

const debug = false;
const warn = (...msg) => debug && console.warn(msg);
const log = (...msg) => debug && console.log(msg);

export const getInterfaces = ({
  targetDirectory,
  excludeFolders,
  tsConfigPath,
  interfaceNameFilter
}: Arguments) => {
    
  const project = new Project({
    tsConfigFilePath: tsConfigPath,
    addFilesFromTsConfig: false
  });

  project.addExistingSourceFiles(`${targetDirectory}/**/*{.d.ts,.ts,.tsx}`);

  //TODO: micromatch instead of excludeFolders
  const [folders, camelCased] = componentNames(
    targetDirectory,
    excludeFolders
  );

  const builder = new ResultBuilder();

  folders.forEach((folder, i) => {

    const sourcefile =
      project.getSourceFile(`${folder}.tsx`) ||
      project.getSourceFile(`${folder}.ts`);

    if (!sourcefile) {
      //TODO: add incompatible to result
      warn( `${folder}.ts* not found` );
      return;
    }

    const matchingInterfaces = sourcefile
      .getInterfaces()
      .filter(x => mm.isMatch( x.getName(), interfaceNameFilter ) );

    if (!matchingInterfaces) {
      return;
    }

    matchingInterfaces.forEach( match => {

      const map = match.getMembers().map(m => [
        m.getSymbol().getName(),
        m
          .getJsDocs()
          .map(doc => doc.compilerNode.comment)
          .join("\n\n") 
      ]);

      const module = {
          name: camelCased[i],
          members: []
      }

      map.forEach(member => {
        const [name, docs] = member;
        module.members.push({
            [name]: docs,
            documented: !!docs
        });

        //DEBUG
        if (!docs) {
          // TODO: check not private, and exported etc
          warn("member", name, "needs documentation");
        } else {
          log(name, ": ", docs);
        }
        log("\n\n------------------------------------\n\n");

      });

      builder.add(module);
    });

  });

  return builder.result;
};
