const fs = require('fs');
const path = require('path');

const args = process.argv.splice(2);

if(args.length === 0)
    ls(__dirname);
else if(args.length === 1) {

    if(args[0] === '-a')
        ls(__dirname, true);
    else if(args[0] === '-R')
        ls(__dirname, false, true);
    else
        ls(args[0]);

} else if(args.length === 2) {

    if(args[0] === '-a')
        ls(args[1], true);
    else if(args[0] === '-R')
        ls(args[1], false, true);
    else
        ls(args[1]);
}

function ls(directory, hidden = false, recursive = false) {

    const files = fs.readdirSync(directory);

    files.forEach((file) => {

        if(hidden || !file.match(/^\..*/)) {

            const dir = path.join(directory, file);

            if(recursive && fs.statSync(dir).isDirectory())
                ls(dir, hidden, recursive);
            else
                console.log(file)
        }
    });
}
