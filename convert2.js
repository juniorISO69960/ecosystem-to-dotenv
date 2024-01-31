const fs = require("fs");

const ecosystem = require("./ecoystem.json");

if (!(process.argv[2])) {
    console.log("Please define a bot to convert.");
    process.exit();
} else if (process.argv[2] === "all") {
    for (var bot of ecosystem["apps"]) {
        const name = bot["name"]; // File name
        var dotenv = convert(bot);
        fs.writeFileSync(`${process.cwd()}/${name}.env`, dotenv);
        console.log(`Wrote file ${name}.env!`);
    }
    console.log(`All files saved!`);
} else {
    let realbot = false;
    for (var bot of ecosystem["apps"]) {
        if (bot["name"] === process.argv[2]) {
            const name = bot["name"]; // File name
            var dotenv = convert(bot);
            fs.writeFileSync(`${process.cwd()}/${name}.env`, dotenv);
            console.log(`Wrote file ${name}.env!`);
            realbot = true;
            break;
        }
        continue;
    }
    if (!realbot) {
        console.log("No bot was found, exiting.");
    }
}

function convert(bot) {
    const env = bot["env"];
    let dotenv = [];

    for (var i of Object.keys(env)) {
        let value;
        if (typeof(env[i]) === "object") {
            value = `'${JSON.stringify(env[i])}'`;
        } else {
            value = JSON.stringify(env[i]);
        }
        dotenv.push(`${i}=${value}`);
    }
    return dotenv.join("\n");
}