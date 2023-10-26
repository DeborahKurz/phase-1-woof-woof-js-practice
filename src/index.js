document.addEventListener("DOMContentLoaded", fetchAllDogs());

function fetchAllDogs(){
    deleteSpan();
    fetch ('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogArray => {
        dogArray.forEach(dogObj => {
            renderBar(dogObj);
            toggleBtn.className = "ON"
        })
    });
};

const toggleBtn = document.getElementById("good-dog-filter");

toggleBtn.addEventListener("click", ()=>{
    deleteSpan();
    fetch ('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogArray => {
        if(toggleBtn.className === "ON"){
            dogArray.forEach(dogObj => {
                if(dogObj.isGoodDog === true){
                    renderBar(dogObj);
                    toggleBtn.className = "OFF"
                    toggleBtn.textContent = "Filter good dogs: ON"
                };
            });
        }else if(toggleBtn.className === "OFF"){
            dogArray.forEach(dogObj => {
                renderBar(dogObj);
                toggleBtn.className = "ON"
                toggleBtn.textContent = "Filter good dogs: OFF"

            })
        }
    });
});

function renderBar(dogObj){
    const dogBar = document.getElementById("dog-bar");
    const span = document.createElement('span');
    dogBar.appendChild(span);
    span.textContent = dogObj.name;
    span.id = "spanId"
    span.addEventListener("click", ()=>{
        deleteDivs();
        renderSummary(dogObj);
    })
}

function renderSummary(dogObj){
    const infoDiv = document.getElementById('dog-info');
    const dogDiv = document.createElement('div');
    dogDiv.id = "dogDiv";
    infoDiv.appendChild(dogDiv);

    const dogImg = document.createElement('img');
    const dogName = document.createElement('h2');
    const dogBtn = document.createElement('button');

    dogDiv.append(dogImg, dogName, dogBtn);

    dogImg.src = dogObj.image;
    dogName.textContent = dogObj.name;
    dogBtn.id = "isDogBtn";

    if(dogObj.isGoodDog === false){
        dogBtn.textContent = "Bad Dog!"
    } else {
        dogBtn.textContent = "Good Dog!"
    }

    isDogGood(dogObj, dogBtn);
}

function isDogGood(dogObj, dogBtn){
    dogBtn.addEventListener("click", ()=>{

        if(dogObj.isGoodDog === false){
            dogBtn.textContent = "Good Dog!"
            dogObj.isGoodDog = true;
            patchDog(dogObj);

        } else if(dogObj.isGoodDog === true) {
            dogBtn.textContent = "Bad Dog!"
            dogObj.isGoodDog = false;
            patchDog(dogObj);
        }
    })
};

function patchDog(dogObj){
    fetch(`http://localhost:3000/pups/${dogObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dogObj)
    })
    .then(resp => resp.json())
    .then(dogObj => console.log(dogObj))
};

function deleteDivs(){
    const oldDogDivs = document.querySelectorAll('#dogDiv');
    for(let dogDiv of oldDogDivs){
        dogDiv.remove();
    }
}

function deleteSpan(){
    const oldSpan = document.querySelectorAll('#spanId')
    for(let spanDiv of oldSpan){
        spanDiv.remove();
    }
};