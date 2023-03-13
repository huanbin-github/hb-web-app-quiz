const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const shuffleQuestionOptions = (options, correctAnswers) => {
    const shuffledOptions = shuffle(options.slice());
    const shuffledCorrectAnswers = correctAnswers.map((index) => shuffledOptions.indexOf(options[index]));
    return [shuffledOptions, shuffledCorrectAnswers];
};

const shuffleSingleChoiceOptions = (question) => {
    return shuffleQuestionOptions(question.options, [question.answerIndex]);
};

const shuffleMultipleChoiceOptions = (question) => {
    return shuffleQuestionOptions(question.options, question.answerIndexes);
};

const renderQuestion = (question, randomiseOptions, highlightAnswers, showInputs) => {
    let options;
    let answerIndexes;

    if (question.type === "判断题") {
        options = ["正确", "错误"];
        answerIndexes = question.answer ? [0] : [1];
    } else if (question.type === "单选题") {
        if (randomiseOptions === true) {
            [options, answerIndexes] = shuffleSingleChoiceOptions(question);
        } else {
            options = question.options;
            answerIndexes = [question.answerIndex];
        }
    } else if (question.type === "多选题") {
        if (randomiseOptions === true) {
            [options, answerIndexes] = shuffleMultipleChoiceOptions(question);
        } else {
            options = question.options;
            answerIndexes = question.answerIndexes;
        }
    }

    // Create the HTML elements
    const container = document.createElement("div");
    container.className = "container";

    const questionTitle = document.createElement("p");
    questionTitle.innerHTML = question.question;
    questionTitle.style.fontWeight = "bold";

    const optionList = document.createElement("ul");

    // Iterate over the options
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("li");
        const optionLabel = document.createElement("label");
        if (showInputs === true) {
            const optionInput = document.createElement("input");
            optionInput.type = question.type === "单选题" || question.type === "判断题" ? "radio" : "checkbox";
            optionInput.name = `question-${question.id}`;
            optionInput.value = i;
            optionLabel.appendChild(optionInput);
        }
        optionLabel.appendChild(document.createTextNode(["A", "B", "C", "D", "E", "F", "G"][i] + '. ' + options[i]));

        if (highlightAnswers === true) {
            if (answerIndexes.includes(i)) {
                optionLabel.style.color = "red";
                optionLabel.style.fontWeight = "bold";
                optionLabel.textContent = '✅ ' + optionLabel.textContent;
            } else {
                optionLabel.style.color = "gray";
            }
        }

        option.appendChild(optionLabel);
        optionList.appendChild(option);
    }

    container.appendChild(questionTitle);
    container.appendChild(optionList);

    return container;
};


