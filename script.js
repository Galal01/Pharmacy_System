// Variables
let title= document.getElementById("title");

//Total
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let discount= document.getElementById('discount');
let total = document.getElementById('total')

let count= document.getElementById('count');
let catogery= document.getElementById('catogery');
let search = document.getElementById('search');
let create= document.getElementById('create');

let searchMode='title';


// Total 
function getTotal(){
    if (price.value != ''){ 
        let result= (+price.value+ +taxes.value) * ((100- +discount.value)/100);
        total.innerHTML= result.toFixed(1);
        total.style.backgroundColor="green"; 
    }else{
        total.innerHTML='';
        total.style.backgroundColor='red';
    }
}

// Create 
let dataPro;
let mood= 'create';
let tempi;
if (localStorage.product != null){
    dataPro= JSON.parse(localStorage.product);
}else{
    dataPro=[];
}

create.onclick = function(){ 
    let newPro={ 
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML, 
        count: count.value,
        catogery: catogery.value.toLowerCase(), 
    }
      
   if (newPro.title != '' && newPro.price != ''){
        if (mood === 'create'){
            if (count.value>1){
                for (i=0; i < count.value ; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
                dataPro[tempi]= newPro;
                mood = 'create';  
                create.innerHTML="create";
                count.style.display='block';          
        }
        clear();
    }else{
        alert('Make sure to inter the whole data');
    }
    localStorage.setItem('product', JSON.stringify(dataPro)) 
    showData();
}






// Clear date after create
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    discount.value='';
    count.value='';
    catogery.value='';
    total.innerHTML='';
}


// READ and SHOW data

let tbody= document.getElementById('tbody');
function showData(){
    getTotal();
    let table = '';
    for(i=0; i < dataPro.length; i++){  
               let temp= dataPro[i];
        table+=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catogery}</td>
            <td><button id="update" onclick= 'updateData(${i})'>Update</button></td>
            <td><button id="delete" onclick= 'deleteData(${i})'>Delete</button></td>
        </tr>`
    }
    tbody.innerHTML= table;

    if (dataPro.length>0){
        let deleteAll = document.getElementById('deleteAll')
        deleteAll.innerHTML=`<button id="delete" onclick= "deleteAllfunc()">Delete All (${dataPro.length})</button>`
    }else{
        deleteAll.innerHTML='';  
    }
};

showData(); 







// DELETE 
function deleteData(i){
    console.log(i);
    dataPro.splice(i,1); 
    localStorage.product= JSON.stringify(dataPro); 
    showData();
};


//DELETE ALL
function deleteAllfunc(){
    dataPro.splice(0); 
    localStorage.clear(); 
    showData();
};


//UPDATE
function updateData(i){
    tempi=i;
    temp= dataPro[i];
    title.value= temp.title;
    price.value= temp.price;
    taxes.value= temp.taxes;
    discount.value= temp.discount;
    total.innerHTML= temp.total;
    catogery.value= temp.catogery;

    getTotal();
    count.style.display='none'; 
    create.innerHTML='Update';
    mood= 'update'; 
    scroll({top:0, behavior:"smooth"});  
}



// SEARCH
function searchFunc(id){
    if (id === 'Title'){
        searchMode= 'title'
    
    }else{
        searchMode= 'catogery'
        
    }
    search.placeholder = 'Search by '+ id; 
    search.focus();  
    search.value='';
    showSearch(search.value);
}

function showSearch(value){
    let tableSearch='';
    if(searchMode === 'title'){
        for(i=0;i<dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){ 
                tableSearch+=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td><button id="update" onclick= 'updateData(${i})'>Update</button></td>
                        <td><button id="delete" onclick= 'deleteData(${i})'>Delete</button></td>
                    </tr>`
            }
        }
    }else{
        for(i=0;i<dataPro.length; i++){
            if(dataPro[i].catogery.includes(value.toLowerCase())){
                tableSearch+=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td><button id="update" onclick= 'updateData(${i})'>Update</button></td>
                        <td><button id="delete" onclick= 'deleteData(${i})'>Delete</button></td>
                    </tr>`
            }
        }
    }
    tbody.innerHTML= tableSearch;
}
