const quizList = [
    { name: "厨师证模拟试题1", quizFile: "./data/quiz/chef-001.json" },
    { name: "厨师证模拟试题2", quizFile: undefined },
];

const loadQuizList = (quizList) => {
    const quizTable = document.getElementById('quiz-list').getElementsByTagName('tbody')[0];
    quizList.forEach((quiz) => {
        const row = quizTable.insertRow();
        const nameCell = row.insertCell();
        const actionCell = row.insertCell();

        nameCell.textContent = quiz.name;

        const loadBtn = document.createElement('button');
        loadBtn.classList.add("btn", "btn-primary");
        loadBtn.setAttribute("type", "button");
        loadBtn.textContent = '载入题库';
        loadBtn.addEventListener('click', (event) => onClickLoadQuiz(event, quiz.name, quiz.quizFile));

        const startBtn = document.createElement('button');
        startBtn.classList.add("btn", "btn-secondary");
        startBtn.setAttribute("type", "button");
        startBtn.textContent = '开始模拟测试';
        startBtn.addEventListener('click', (event) => onClickStartQuiz(event, quiz.name, quiz.quizFile));

        actionCell.appendChild(loadBtn);
        actionCell.appendChild(startBtn);
    });
};

loadQuizList(quizList);
