async function input(): Promise<number> {
    return 10;
}


async function execute(code: string, array: number[]): Promise<string> {
    let outputData: string = "";

    const codeSplit = code.split('');
    let isFinal = false;
    let codePoint: number = 0;
    let point: number = 0;
    const stack: number[] = [];

    while (!isFinal) {
        switch (codeSplit[codePoint]) {
            case '+':
                if (array[point] === 255) {
                    array[point] = 0;
                } else {
                    array[point]++;
                }
                codePoint++;
                break;
            case '-':
                if (array[point] === 0){
                    array[point] = 255;
                } else {
                    array[point]--;
                }
                codePoint++;
                break;
            case '>':
                point++;
                if (array[point] === undefined) {
                    array.push(0);
                }
                codePoint++;
                break;
            case '<':
                if (point > 0) point--;
                codePoint++;
                break;
            case '.':
                outputData += String.fromCharCode(array[point]);
                codePoint++;
                break;
            case ',':
                array[point] += await input();
                codePoint++;
                break;
            case '[':
                if (array[point] === 0) {
                    let depth = 1;
                    while (depth > 0) {
                        codePoint++;
                        if (codeSplit[codePoint] === '[') depth++;
                        if (codeSplit[codePoint] === ']') depth--;
                    }
                } else {
                    stack.push(codePoint);
                }
                codePoint++;
                break;
            case ']':
                if (array[point] !== 0) {
                    codePoint = stack[stack.length - 1];
                } else {
                    stack.pop();
                    codePoint++;
                }
                break;

            default:
                break;
        }
        if (codePoint >= codeSplit.length) { isFinal = true; }

    }
    console.log(array);
    return outputData;
}
execute(">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.>>>++++++++[<++++>-]<.>>>++++++++++[<+++++++++>-]<---.<<<<.+++.------.--------.>>+.>++++++++++." ,[0])
    .then(console.log)
    .catch(console.error)
