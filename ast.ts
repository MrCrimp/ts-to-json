import { componentNames } from "./component-resolver";
import { Project } from "ts-simple-ast";
import { ResultBuilder } from "./result";

export const getInterfaces = ({
  targetDirectory,
  userExcludeFolders,
  userTsConfigLocation
}) => {
    
  const project = new Project({
    tsConfigFilePath: userTsConfigLocation,
    addFilesFromTsConfig: false
  });

  project.addExistingSourceFiles(`${targetDirectory}/**/*{.d.ts,.ts,.tsx}`);

  const [folders, camelCased] = componentNames(
    targetDirectory,
    userExcludeFolders
  );

  const builder = new ResultBuilder();

  folders.forEach((folder, i) => {
    const sourcefile =
      project.getSourceFile(`${folder}.tsx`) ||
      project.getSourceFile(`${folder}.ts`);
    if (!sourcefile) {
      console.log(folder, "not found");
      return;
    }

    // TODO: micromatch
    const props = sourcefile
      .getInterfaces()
      .filter(x => x.getName() === `${camelCased[i]}Props`)[0];

    if (!props) {
      return;
    }

    const map = props.getMembers().map(m => [
      m.getSymbol().getName(),
      m
        .getJsDocs()
        .map(doc => doc.compilerNode.comment)
        .join("\n\n") //TODO: do not join
    ]);

    const module = {
        name: camelCased[i],
        members: []
    }

    console.group(camelCased[i]);

    map.forEach(member => {
      const [name, docs] = member;
      module.members.push({
          [name]: docs,
          documented: !!docs
      });

      if (!docs) {
        // TODO: check not private, and exported etc
        console.warn("member", name, "needs documentation");
      } else {
        console.log(name, ": ", docs);
      }
      console.log("\n\n------------------------------------\n\n");
    });
    console.groupEnd();

    builder.add(module);
  });

  return builder.result;
};
