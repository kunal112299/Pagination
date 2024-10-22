let content = document.getElementById('content');


let page = 0;
let contentSize = 3;
let pageSize;

const createCard = (recipe) => {
    let Cardcontainer = document.createElement('div');
    Cardcontainer.classList.add("card-container");
    

    let Image = document.createElement('div');  
    Image.classList.add('card-image');
    let Details = document.createElement('div');
    Details.classList.add('card-details');
    Cardcontainer.append(Image);
    Cardcontainer.append(Details);

    let img = document.createElement('img');
    img.src = recipe.image;  
    let Resipename = document.createElement('h2');
    Resipename.textContent = recipe.name;  

    let Button = document.createElement('button');
    Button.textContent = "Ingredients";

    Image.append(img);
    Details.append(Resipename);
    Details.append(Button);
    content.append(Cardcontainer);
};

function getData(){
    fetch('https://dummyjson.com/recipes')
    .then(res => res.json())
    .then(data => showData(data.recipes));
}

function showData(data){
    content.innerText = '';
    pageSize = Math.ceil(data.length/contentSize);
    console.log(pageSize);
    console.log(data);
    let pageData = data.slice((page*contentSize), ((page+1)*contentSize));
    console.log(pageData);
    pageData.forEach(element => {
        createCard(element);
    });
    renderPagination();
}

function renderPagination(){

    

    const pageContainer = document.querySelector('.pagination');
    pageContainer.innerHTML ="";

    let previousButton = document.createElement('button');
    previousButton.classList.add('btn');
    previousButton.textContent = "<";
    pageContainer.append(previousButton);

    let nextButton = document.createElement('button');
    nextButton.classList.add('btn');
    nextButton.textContent=">";
    

    for (let i= 0; i<pageSize; i++){
        let pageButton = document.createElement('button');
        pageButton.classList.add('btn');
        pageButton.textContent = i+1;
        console.log(i,page);
        if(i === page){
            pageButton.classList.add('active');
        }
        if(page===0){
            previousButton.classList.add('hidden');
        }
        if(page == pageSize-1){
            nextButton.classList.add('hidden');
        }

        pageContainer.append(pageButton);   
    }
    pageContainer.append(nextButton);
}


function handleClick(e) {
    if(e.target.classList.contains("btn")){
        let newPage = e.target.textContent;

        if(newPage === "<"){
            if(page>0){
                page--;
                getData(page);
            }
        }else if(newPage ===">"){
            if(page<pageSize-1){
                page++;
                getData(page);
            }
        }else{
            page = parseInt(newPage)-1;
            getData(page);
        }
    }
}
document.querySelector('.pagination').addEventListener('click', handleClick)


getData();
