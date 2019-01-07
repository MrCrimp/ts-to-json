module.exports = function (w) {

    return {
        files: [
            'src/**/*.ts' ,
            '!src/**/*.test.ts' 
        ],

        tests: [
            'src/**/*.test.ts',
            'src/**/*.spec.ts'
        ],

        testFramework: 'ava',
        
        env: {
            type: 'node'
        },

        delays: {
            run: 500
        }
    };
};