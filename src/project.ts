import {Project} from 'ts-simple-ast';
import { Arguments } from './options';
import { componentNames } from './resolve-files';

export interface ProjectOptions {
  projectFilesIncludeGlob?: string;
  tsConfigPath?: string;
  targetDirectory: string;
}

export const getProject = ({
  tsConfigPath,
  targetDirectory,
  projectFilesIncludeGlob = '/**/*{.d.ts,.ts,.tsx}'
}: ProjectOptions):Project=> {
   
  const project = new Project({
    tsConfigFilePath: tsConfigPath,
    addFilesFromTsConfig: false
  });
  
  project.addExistingSourceFiles(`${targetDirectory}${projectFilesIncludeGlob}`);
 
  return project;
 
}

export const getComponentsByConvention = (
  project: Project,
  {
    targetDirectory,
    excludeFolders,
  }: Arguments
)=>{

  return componentNames(
    targetDirectory,
    excludeFolders
  );

}