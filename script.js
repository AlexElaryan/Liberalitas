function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log("Email скопирован: " + text);
    }).catch(err => {
        console.error("Ошибка копирования: ", err);
    });
}

const register = document.querySelector('.register-modal');
const login = document.querySelector('.log-in-modal');

function modalOpen(modal) {
    modal.classList.add('modalRegActive');
}

function modalClose(modal) {
    modal.classList.remove('modalRegActive');
}

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});