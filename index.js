// Dom Manipulation

const myForm = document.getElementById("search-form");
console.log(myForm);

const myInput = document.getElementById("searchbar");


const myWordTitle = document.getElementById("word-title");


const mydefinitionWord = document.getElementById("definitionWord");

const mySynonymWord = document.getElementById("synonmWord");

//const myButton = document.getElementById("buttoni");


// Add eventListener

myForm.addEventListener("submit",  function (event) {
    event.preventDefault()

    const myWord = myInput.value.trim();


    if (myWord === "") {
        alert("Please insert a word");
        return;
    }

    // remove previous search results

    myWordTitle.textContent = "";
    mydefinitionWord.innerHTML = "";
    mySynonymWord.innerHTML= "";
      
            const dictionaryApi = `https://freedictionaryapi.com/api/v1/entries/en/${encodeURIComponent(myWord)}`;


          fetch(dictionaryApi)

        .then(response => {
            if(!response.ok){
                throw new Error("Word not found, look for a snonymn")
            }

            return response.json();
        })

        .then(function (data) {
            console.log("Exact word:", data.word);
            console.log("search word:", data.entries);
            console.log("source details:", data.source);


            if(!data.entries || data.entries.length === 0) {
                throw new Error ("No dictionary entries found for this word.");
            }

                    myWordTitle.textContent = data.word;

                    mydefinitionWord.innerHTML = "";

                    mySynonymWord.innerHTML = "";


            data.entries.forEach(function (entry){
                console.log("Parts of speech:", entry.partOfSpeech);

                entry.pronunciations?.forEach(function(pronunciations){
                    console.log("pronunciation", pronunciations.text);
                });
                  // Display definition of the searched word
                entry.senses?.forEach(function(sense) {
                     
                    if(sense.definition) {
                        const definition = document.createElement("p");
                        definition.textContent = sense.definition;
                        mydefinitionWord.appendChild(definition);
                    }

                    if(sense.synonyms && sense.synonyms.length > 0) {
                        const synonym = document.createElement("p");
                        synonym.textContent = sense.synonyms.join(", ");
                        mySynonymWord.appendChild(synonym);
                    }
                })
            })

            myInput.value = "";

        })

        
        .catch(error => {
            console.error("Encountered an error", error.message);
        })
})

