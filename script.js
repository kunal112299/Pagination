let content = document.getElementById('content');


let page = 0;
let contentSize = 8;
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
}
function handleClick(e) {
    if(e.target.classList.contains("btn")){
        let newPage = e.target.textContent;

        if(newPage === "<"){
            if(page>1){
                page--;
                getData(page);
            }
        }else if(newPage ===">"){
            if(page<pageSize){
                page++;
                getData(page);
            }
        }else{
            page = parseInt(newPage);
            getData(page);
        }
    }
}
document.querySelector('.pagination').addEventListener('click', handleClick)


getData();
