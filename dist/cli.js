"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spinner = require("ora");
const fs = require("fs");
const interface_parser_1 = require("./interface-parser");
const options_1 = require("./options");
const json_1 = require("./json");
const project_1 = require("./project");
const terminal_line = '____________________________\n';
exports.showProgress = () => {
    console.clear();
    console.log('\x1Bc');
    return spinner('Working...').start();
};
const [targetDirectory, tsConfigPath, outfile = 'result.json', interfaceNameGlob = ['*']] = process.argv.slice(2);
const progress = exports.showProgress();
const options = options_1.inferOptions({
    targetDirectory,
    tsConfigPath
});
const project = project_1.getProject(options);
const result = interface_parser_1.parseInterfaces(project, options);
outfile && fs.writeFileSync(outfile, json_1.stringify(result));
if (!result || !result.length) {
    progress.fail('Result contained no entries. This might be caused by a invalid target folder.');
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
        "No outfile was provided");
console.log(terminal_line);
process.exit();
//# sourceMappingURL=cli.js.map