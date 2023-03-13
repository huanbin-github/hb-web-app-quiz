const showAnswer = (question) => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modalShowAnswer";

    const modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    const headerTitle = document.createElement("h5");
    headerTitle.innerHTML = "答案";
    modalHeader.appendChild(headerTitle);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.appendChild(renderQuestion(question, randomiseOptions = false, highlightAnswers = true, showInputs = false));

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // close modal when clicked outside of modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.remove();
        }
    };

    // remove modal from DOM on dispose
    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
    });

    document.body.appendChild(modal);
    const m = new bootstrap.Modal(modal, {
        keyboard: true
    });
    m.show();
};

const onClickShowAnswer = showAnswer;
