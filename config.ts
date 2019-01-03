const DEFAULT_TS_CONFIG = `/tsconfig.json`;

const DEFAULT_EXCLUDE = ["__tests__", "__mocks__"];

export const configure = args => {

  const {
    targetDirectory = process.cwd(),
    userExcludeFolders = DEFAULT_EXCLUDE,
    userTsConfigLocation = DEFAULT_TS_CONFIG
   } = args;

   return {
    targetDirectory,
    userExcludeFolders,
    userTsConfigLocation
   }
};
