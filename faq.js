/*FAQs*/
const qBtn = document.querySelectorAll(".question-btn");

qBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const question = e.currentTarget.parentElement.parentElement;
    // console.log(question);
    if (question) {
      const faqText = question.querySelector(".question-answer");
      const minus = question.querySelector(".minus");
      const plus = question.querySelector(".plus");

      minus.classList.toggle("display-btns");
      faqText.classList.toggle("display-btns");
      plus.classList.toggle("unshow");
    }
  });
});
