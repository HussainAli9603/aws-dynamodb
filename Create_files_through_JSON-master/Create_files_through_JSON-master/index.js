//const { rejects } = require('assert/strict');

const { F_OK, ALPN_ENABLED } = require('constants');
var fs = require('fs');
//const { resolve } = require('path/posix');

const struct = {
    path: "C:\\Users\\Hycube 16\\Desktop\\Dynamic Iterator\\test",
    structure: {
        name: "main",
        type: "folder",
        ext: null,
        sub: [
            {
                name: "src",
                type: "folder",
                ext: null,
                sub: [
                    {
                        name: "config",
                        type: "folder",
                        ext: null,
                        sub: [
                            {
                                name: "DB",
                                type: "folder",
                                sub: [
                                    {
                                        name: "DB",
                                        type: "file",
                                        sub: null,
                                        ext: "ts"
                                    }
                                ],
                                ext: null
                            },
                            {
                                name: "BD",
                                type: "folder",
                                sub: [
                                    {
                                        name: "DB",
                                        type: "file",
                                        sub: null,
                                        ext: "ts"
                                    }
                                ],
                                ext: null
                            }
                        ]
                    },
                    {
                        name: "modules",
                        type: "folder",
                        sub: [
                            {
                                name: "config",
                                type: "folder",
                                ext: null,
                                sub: [
                                    {
                                        name: "DB",
                                        type: "folder",
                                        sub: [
                                            {
                                                name: "DB",
                                                type: "file",
                                                sub: null,
                                                ext: "ts"
                                            }
                                        ],
                                        ext: null
                                    },
                                    {
                                        name: "BD",
                                        type: "folder",
                                        sub: [
                                            {
                                                name: "DB",
                                                type: "file",
                                                sub: null,
                                                ext: "ts"
                                            }
                                        ],
                                        ext: null
                                    }
                                ]
                            },
                            {
                                name: "modules",
                                type: "folder",
                                sub: null,
                                ext: null
                            },
                            {
                                name: "documents",
                                type: "folder",
                                sub: null,
                                ext: null
                            },
                        ],
                        ext: null
                    },
                    {
                        name: "documents",
                        type: "folder",
                        sub: null,
                        ext: null
                    },
                ]
            },
            {
                name: "node",
                type: "folder",
                ext: null,
                sub: null
            }
        ]
    }
};

async function initial() {
    fs.access(struct.path, F_OK, async (err) => {
        if (err) {
            fs.mkdirSync(struct.path, (err) => {
                if (err)
                    throw err;
                //console.log(`\nPath secured: ${struct.path}\n`);
                //CreateStrcture();
            });
        }

        console.log(`\nPath secured: ${struct.path}\n`);
        //console.log(struct.structure)
        await CreateStructure(struct.structure);
        iterateStruct(struct.structure.sub);
    })
}
var path = [struct.path];
//var visited = [];

async function CreateStructure(route) {
    //console.log(route);
    //console.log(convert_pathArray_to_Path());
    // fs.mkdir(convert_pathArray_to_Path(), (err)=>{
    //     if (err) throw err;
    //     console.log("ok");
    // })
    //path.push(route.name);
    file = "";
    if (route.type != 'folder' && route.ext)
        file += `${route.name}.${route.ext}`;
    else
        path.push(route.name);
    let promise = new Promise((resolve, reject) => {
        fs.access(convert_pathArray_to_Path() + file, F_OK, (err) => {
            if (err) {
                if (file != '')
                    fs.writeFile(convert_pathArray_to_Path() + file, "", (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                else
                    fs.mkdir(`${convert_pathArray_to_Path()}`, (err) => {
                        if (err) {
                            throw err
                        }
                    })
                console.log(`${convert_pathArray_to_Path()}${file}: created *`);
                resolve(true);
            } else {
                console.log(`${convert_pathArray_to_Path()}${file} : available *`);
                resolve(true);
            }
        })
    })
    return await promise;
}

//iterate over sub.. Recursive Function

async function iterateStruct(ArraySub) {
    debugger
    //console.log(ArraySub);
    for (obj of ArraySub) {
        //console.log(obj);

        //console.log("Hello", visited);
        if (obj.sub) {
            await CreateStructure(obj);
            //visited.push(obj);
            await iterateStruct(obj.sub);
        } else {
            await CreateStructure(obj);
            if (obj.type == 'folder')
                console.log(path.pop(), `popped, entered path: ${convert_pathArray_to_Path()}`);
            //visited.push(obj);
        } //console.log(path.pop());
        //else {
        //     console.log(ArraySub);
        //     return iterateStruct(ArraySub);
        // }
        //visited.push(obj.name);
        //console.log(path.pop());
        //console.log("tt");
        //console.log("itt")
    }
    console.log(path.pop(), `popped, entered path: ${convert_pathArray_to_Path()}`);
}
//convert path array to a path string 
function convert_pathArray_to_Path() {
    //get global path array first
    var pathString = "";
    for (value of path) {
        pathString += `${value}\\`;
    }
    return pathString;

}
initial();
/**
 * -C:\\Users\\Hycube 16\\Daily Training
 * --main
 * ---src
 * ----config
 * -----DB
 * ----modules
 * ----documents
 * ---node
 */