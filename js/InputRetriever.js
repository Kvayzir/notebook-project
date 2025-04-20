export default class InputRetriever {
  constructor() {
    this.input = [];
    const tools = [
        new Tool("Attempt", "Try to write as you can", "purple"),
        new Tool("Vocabulary", "New word", "green"),
        new Tool("Translate", "Let's go from zero", "blue"),
    ];
    
    tools.forEach(tool => $("#toolsContainer").append(tool.getButton()));
  }

  setInput(input) {
    this.input = input;
  }

  _parseInput = (jqElement) => {
    const self = this;
    jqElement.contents().each(function (){
        if (this.nodeType === Node.TEXT_NODE) {
            const text = $(this).text().trim();
            if (text) {
                self.input.push({type: "Text", content: text});
            }
        } else if (this.nodeType === Node.ELEMENT_NODE) {
            const className = $(this).attr("class");
            if (className && className.includes("Attempt")) {
                self.input.push({type: "Attempt", content: $(this).find("input").val()});
            } else if (className && className.includes("Vocabulary")) {
                self.input.push({type: "Vocabulary", content: $(this).find("input").val()});
            } else if (className && className.includes("Translate")) {
                self.input.push({type: "Translate", content: $(this).find("input").val()});
            } else {
                self.input.push({type: "Enter"});
                self._parseInput($(this));
            }
        }
    });
    self.input.push({type: "Enter"});
  }

  getInput = () => {this.input = []; this._parseInput($("#text")); return this.input;}

} 

class Block {
    constructor(color, type) {
        this.text = $(`<input class="input-text" type="text" placeholder="Write here..." />`);
        this.block = $(`<div class="block ${type}" contenteditable="false" style="background-color: ${color};"></div>`);
        this.block.append(this.text);
    }

    getBlock = () => this.block;
}

class Tool {
    constructor(name, description, color) {
        this.name = name;
        this.description = description;
        this.color = color;
        this.button = $(`<button class="btn btn-primary" style="background-color: ${color}"><span>${name}</span></button>`);
        this.button.click(() => {   
            const block = new Block(color, name).getBlock();
            const selection = window.getSelection();
            const range = selection.getRangeAt(0); // Get the current range (cursor position)

            if (range) {
                // Create a document fragment to insert the block
                const fragment = document.createDocumentFragment();
                fragment.appendChild(block[0]); // Convert jQuery object to DOM node
                range.deleteContents(); // Remove any selected text
                range.insertNode(fragment); // Insert the block at the cursor position

                // Move the cursor after the inserted block
                range.setStartAfter(block[0]);
                range.setEndAfter(block[0]);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
    }

    getButton = () => this.button;
}
