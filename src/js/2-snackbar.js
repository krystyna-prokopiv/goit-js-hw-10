

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector(".form")

form.addEventListener("submit", handleSubmit)


function handleSubmit(ev) {
    ev.preventDefault()

    const delayValue = +ev.target.elements.delay.value;
    const stateValue = ev.target.elements.state.value;

    if (!delayValue) {
        return
    }

    setTimeout(() => {
      new Promise((resolve, reject) => {
          if (stateValue === "fulfilled") {
          resolve(delayValue)
            
          } else {
              reject(delayValue)
        }
      })
            .then((delay) => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${delay}ms`,
                color: "green",
                position: "topRight"
});
            
        })
          .catch((delay) => {
              iziToast.show({
                  message: `❌ Rejected promise in ${delay}ms`,
                  color: "red",
                  position: "topRight"
              });
            
          } )
         
    }, delayValue)

    ev.target.reset()

}








