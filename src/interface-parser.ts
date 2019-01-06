
import { getInterfaces } from "./ast";
import { getComponentsByConvention } from './project';
import Project from 'ts-simple-ast';

export const parseInterfaces = (
  project: Project,
  options,
  componentResolver = getComponentsByConvention
  )=>{

  const [folders, modules] = componentResolver(project, options)

  const interfaceInfo = getInterfaces(
    project,
    folders,
    modules
  );
  
  return interfaceInfo;
}
