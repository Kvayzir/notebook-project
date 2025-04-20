export default class OutputHandler {
    constructor() {
        this.output = [];
    }

    setOutput(output) {
        this.output = output;
    }

    displayOutput(output) {
        this.output = output;
        const outputContainer = $("#textOutput");
        outputContainer.empty(); // Clear previous output

        let html = [];
        let temp = "<p>";
        this.output.forEach(item => {
            if (item.type == "Text") {
                temp += item.content;
            } else if (item.type != "Enter") {
                temp += ` <span class="${item.type}">${item.content}</span>`;
            }
            else {
                if (temp == "<p>") {
                    return;
                }
                temp += ".</p>";
                html.push(temp);
                temp = "<p>";
            }
        });

        html.forEach(item => {
            outputContainer.append($(item));
        });
    }
}