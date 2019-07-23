// replacementFunction.js
const readline = require("readline");

function getResultFromCmd(inputParam, num, newsubstring) {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Input 3 params using , : ' + inputParam + ', ' + num + ', ' + newsubstring, (answer) => {
        let s;
        let b = checkinput(answer);
        if (b) {
            s = replacementFunction(answer);
        } else {
            console.log(`You entered wrong values: ${answer}`);
            rl.close();
            return
        }
        rl.close();
        console.log("New one: ", s);

    });

}

function replacementFunction(cmdValue) {
    let res = cmdValue.split(",");
    let longString = res[0].split(" ");

    for (let i = 0; i < longString.length; i++) {
        if (longString[i].length >= res[1]) {
            let tmp = longString[i].replace(longString[i][res[1]], res[2]);
            longString[i] = tmp;
        }
    }

    return longString.join(" ");
}

function checkinput(value) {
    let res = longstring.split(",");
    if (res.length != 3){
        return 0;
    }
    if (((typeof res[1]) !== 'string') || ((typeof res[1]) !== 'number') || ((typeof res[2]) !== 'string')){
        return 0;
    }

    return true;
}

module.exports = getResultFromCmd;
