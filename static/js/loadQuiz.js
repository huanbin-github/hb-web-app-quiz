const loadQuizQuestions = (name, questions) => {
    document.title = name;
    // Remove existing quiz questions container
    const existingContainer = document.getElementById('quiz-questions');
    if (existingContainer) {
        existingContainer.remove();
    }
    const quizQuestionsContainer = document.createElement('div');
    quizQuestionsContainer.className = 'container';
    quizQuestionsContainer.id = 'quiz-questions';
    const quizTable = document.createElement('table');
    quizTable.className = 'table table-hover table-bordered';
    const thead = quizTable.createTHead();
    const headerRow = thead.insertRow();
    const headers = ['题目编号', '题目类型', '题目文本', '题目答案'];
    headers.forEach((header) => {
        const cell = headerRow.insertCell();
        cell.textContent = header;
    });
    const tbody = quizTable.createTBody();
    questions.forEach((question, index) => {
        const row = tbody.insertRow();
        const questionNumberCell = row.insertCell();
        questionNumberCell.textContent = index + 1;
        const questionTypeCell = row.insertCell();
        questionTypeCell.textContent = question.type;
        const questionTextCell = row.insertCell();
        questionTextCell.appendChild(renderQuestion(question, randomiseOptions = false, highlightAnswers = false, showInputs= false));
        const answerCell = row.insertCell();
        const showAnswerButton = document.createElement('button');
        showAnswerButton.classList.add("btn", "btn-primary");
        showAnswerButton.setAttribute("type", "button");
        showAnswerButton.textContent = '显示答案';
        answerCell.appendChild(showAnswerButton);
        showAnswerButton.addEventListener('click', (event) => onClickShowAnswer(question));
    });
    quizQuestionsContainer.appendChild(quizTable);
    document.body.appendChild(quizQuestionsContainer);
};

const loadQuiz = async (name, quizFile) => {
    if (!quizFile) {
        alert("对不起，题库暂时没有上传!");
        return false;
    }
    const jsonResponse = await fetch(quizFile);
    const questions = await jsonResponse.json();
    loadQuizQuestions(name, questions);
    return true;
};

const onClickLoadQuiz = async (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    const { name, quizFile } = quizList[rowIndex - 1];
    if (await loadQuiz(name, quizFile)) {
        event.target.setAttribute("disabled", "disabled");
    } else {
        event.target.removeAttribute("disabled");
    }
};