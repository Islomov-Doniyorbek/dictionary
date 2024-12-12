const wrapper = document.querySelector(".wrapper"),
    searchInput = document.querySelector("input"),
    synonyms = document.querySelector(".list"),
    infoText = document.querySelector(".info-text"),
    volume = document.querySelector(".fa-volume-up"),
    removeInput = document.querySelector(".fa-close")
let audio;
    
function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning og <span>${word}</span>. Please, try to search`
    } else {
        console.log(result);
        wrapper.classList.add("activate")


        let def = result[0].meanings[0].definitions[0],
            syn = result[0].meanings[0].synonyms,
            fonetika = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}`;

        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = fonetika;
        document.querySelector(".meaning span").innerHTML = def.definition;
        document.querySelector(".example span").innerHTML = def.example;
        synonyms.innerHTML = "";
        audio = new Audio();
        audio.src = result[0].phonetics[0].audio;
        console.log("https://" + result[0].phonetics[0].audio);
        volume.addEventListener("click", () => {
            audio.load();
            audio.play();
        })
        if (syn.length != 0) {
            for (let i = 0; i < syn.length; i++){
                if (i < 5) {
                    let tag = `<span onclick=search('${syn[i]}')>${syn[i]},</span>`;
                    synonyms.insertAdjacentHTML("beforeend", tag)
                }
            }
            // synonyms.parentElement.style.display = "block"
        }   else{
            let tag = `No found synonyms`;
            synonyms.insertAdjacentHTML("beforeend", tag)
            // synonyms.parentElement.style.display = "none"
            
            }  
    }

}

function fetchApi(word) {
    wrapper.classList.remove("activate")
    infoText.style.color = "#000000";
    infoText.innerHTML = `Searching the meaning of <span>${word}</span>`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(res=>res.json()).then(result=>data(result, word))
}
function search(word) {
    searchInput.value = word;
    fetchApi(word)
}
removeInput.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("activate");
    infoText.style.color = "#989898";
    infoText.innerHTML = `Type a word and press enter to get meaning example, pronuncition and synonyms of that typed word`
})

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value)
        console.log(1);
    }
})

