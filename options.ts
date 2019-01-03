
const DEFAULT_EXCLUDE = [
  "__tests__", 
  "__mocks__",
  "node_modules",
  "bin"
];

export interface Arguments{
  targetDirectory: string;
  excludeFolders?: string[];
  tsConfigPath?:string;
  interfaceNameFilter?: string[];
}

export const inferOptions = (args:Arguments): Arguments => {

  const {
    targetDirectory = process.cwd(),
    excludeFolders = DEFAULT_EXCLUDE,
    tsConfigPath = `${targetDirectory}/tsconfig.json`,
    interfaceNameFilter = ['*']
   } = args;

   return {
    targetDirectory,
    excludeFolders,
    tsConfigPath,
    interfaceNameFilter
   }
};
