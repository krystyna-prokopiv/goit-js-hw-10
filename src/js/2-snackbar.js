

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
          resolve(`✅ Fulfilled promise in ${delayValue}ms`)
            
          } else {
              reject(`❌ Rejected promise in ${delayValue}ms`
)
        }
      })
            .then((data) => {
            iziToast.show({
                message: data,
                color: "green",
                position: "topRight"
});
            
        })
          .catch((error) => {
              iziToast.show({
                  message: error,
                  color: "red",
                  position: "topRight"
              });
            
          } )
         
    }, delayValue)

    ev.target.reset()

}








