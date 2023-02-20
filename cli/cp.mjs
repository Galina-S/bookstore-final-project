import fs from "fs";

const name = process.argv[2];

if (name === undefined) {
    console.log(`
        SCRIPT: cp
        NAME: create page
        ------------------
        EXAMPLE: npm run cd INFO
        RESULT: creates page  /src/pages/PageInfo.js
    `);
} else {
    const content = `
    export const Page${name} = () => {
        return (
            <div className = "page${name}">
                <p>This is the ${name} page</p>
            </div>
        )
    }
    `;
    (async() => {
        fs.writeFile(`./src/pages/Page${name}.jsx`, content.trim(), () => {})
    })();
};