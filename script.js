function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log("Email скопирован: " + text);
    }).catch(err => {
        console.error("Ошибка копирования: ", err);
    });
}