const startQuiz = async (name, quizFile) => {
    // we will implement this later
    if (!quizFile) {
        alert("对不起，题库暂时没有上传!");
        return;
    }
    alert("对不起，模拟测试功能尚未开启!");
};

const onClickStartQuiz = (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    const { name, quizFile } = quizList[rowIndex - 1];
    startQuiz(name, quizFile);
};
