import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

// for stylization purposes
const goBtn = document.querySelector("button");
goBtn.classList.add("snackbar-btn");
// 

function delayPromise(delay, radioChecked) {
  const item = { delay, radioChecked };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioChecked === 'fulfilled') {
        resolve(item);
      } else {
        reject(item);
      }
    }, delay);
  });
}

form.addEventListener("submit", handleForm);

function handleForm(event) {

  event.preventDefault();

  const form = event.target;
  const delay = Number(form.elements.delay.value);    
  const radioChecked = form.elements.state.value;

  delayPromise(delay, radioChecked)
    .then(({ delay }) => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topRight',
      });
    })
    .catch(({ delay }) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topRight',
      });
    });    

  form.reset();
}


