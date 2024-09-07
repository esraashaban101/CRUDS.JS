// select variables

let inputTitle=document.getElementById('title');
 inputprice=document.getElementById('Price'),
inputTaxes=document.getElementById('Taxes'),
inputDiscount=document.getElementById('Discount'),
inputCount=document.getElementById('Count'),
inputAds=document.getElementById('Ads')
inputCategory=document.getElementById('Category'),
createBtn=document.getElementById('CreateBtn'),

totalcount=document.querySelector('.total'),
deleteAllBtn=document.getElementById('deleteAllBtn'),
deleteAllDiv=document.querySelector('.delete-div'),
updateBtn=document.querySelector('#update');
// console.log(inputTitle,inputprice,inputTaxes,inputCount,inputDiscount,inputCategory,createBtn,totalcount)
let mood='create',temp;

// get total price function
let res;
function getTotalCount()
{
    if(inputprice!=='' && inputprice.value>0)
    {
         res= (+inputprice.value + +inputTaxes.value + +inputAds.value)- (+inputDiscount.value);
        totalcount.innerHTML = `Total:${res}`
        totalcount.style.backgroundColor='#040'
        // console.log(res)
    }
    else
    {
          totalcount.innerHTML = `Total:`
        totalcount.style.backgroundColor='#d50000'
    }
}
 
// create product
let productList;
if(localStorage.getItem('productList')!==null)
{
  productList=JSON.parse(localStorage.getItem('productList'));


}
else
{
    productList=[];
  

}
createBtn.addEventListener('click',function()
{
    
   if(inputTitle.value!==''   && inputCategory.value!==''&&inputprice.value>0 )
   {
    let product=
    {
        title:inputTitle.value.toLowerCase(),
        price:inputprice.value,
        taxes:inputTaxes.value,
        discount:inputDiscount.value,
        count:inputCount.value,
        ads:inputAds.value,
        category:inputCategory.value.toLowerCase(),
        total:totalcount.innerHTML.slice(6)
    }
      
     if(mood=='create')
     {
        if(product.count > 0)
            {
               
               for(let i= 0; i< product.count ; i++)
               {
                   
                   productList.push(product)
               }
            }
     }
     else
     {
         productList[temp] = product;
         mood='create'
         createBtn.innerHTML='Create';
          inputCount.style.display='block';
     }
   
    dispalyProducts(productList)
     clearInputs()
    // console.log(productList)
    localStorage.setItem('productList',JSON.stringify(productList))
   }
 
}
)


// clear inputs data
function clearInputs()
{
    inputTitle.value='';
    inputprice.value='';
    inputTaxes.value='';
    inputDiscount.value='';
    inputCount.value='';
    inputAds.value='';
    inputCategory.value='';

    totalcount.innerHTML='Total:';
   totalcount.style.backgroundColor='#d50000'
}


// dispaly craeted products


function dispalyProducts(productList)
{
    let tableBody=document.querySelector('#table-body');
    let cartona=``
   
   for(let i=0;i<productList.length;i++)
   {
        cartona+=` <tr>
            <td>${i+1}</td>
            <td>${productList[i].title}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].taxes? productList[i].taxes:0}</td>
            <td>${productList[i].ads? productList[i].ads:0}</td>
            <td>${productList[i].discount?productList[i].discount:0}</td>
            <td>${productList[i].total}</td>
            
            <td>${productList[i].category}</td>
            
            <td ><button onclick="editProduct(${i})" id="update">update</button></td>
            <td ><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>`
   }
   tableBody.innerHTML=cartona;
   if(productList.length>0)
   {
      deleteAllDiv.innerHTML=` <button id="deleteAllBtn" onclick="deleteAll()">Delete All Products (${productList.length})</button>`
   }
   else
   {
    deleteAllDiv.innerHTML=``
   }
}
dispalyProducts(productList);
// update product
function editProduct(index)
{
     inputTitle.value=productList[index].title;
       inputprice.value=productList[index].price;
        inputTaxes.value=productList[index].taxes;
        inputDiscount.value=productList[index].discount;        
        inputCount.value=productList[index].count;
        inputAds.value=productList[index].ads;
        inputCategory.value=productList[index].category;
        totalcount.innerHTML=`Total:${productList[index].total}`;
        totalcount.style.backgroundColor='#040'
        createBtn.innerHTML=`Update`;
        mood='update';
         inputCount.style.display='none'
        temp=index;
        dispalyProducts(productList);
        localStorage.setItem('productList',JSON.stringify(productList));
        scroll({
            top:0,
            behavior:'smooth'
        })
         


}


// delete product
function deleteProduct(index)
{
    productList.splice(index,1);
    dispalyProducts(productList);
    localStorage.setItem('productList',JSON.stringify(productList))
}


// delete all products
function deleteAll()
{
    localStorage.removeItem('productList')
    productList=[]
    dispalyProducts(productList);
    deleteAllDiv.innerHTML='';
}

// search function

let searchmood='title';
let searchInput=document.getElementById('Search')
function getSearchMood(id)
{
    
    if(id=='SearchByTitle')
    {
       
        searchmood='title';
        searchInput.placeholder ='Search By Title'
    }
    else
    {
       searchmood='category'
        searchInput.placeholder ='Search By Category'
    }
    searchInput.focus()
    

}

// search data
searchInput.addEventListener('keyup',function()
{
    let tableBody=document.querySelector('#table-body');
        let cartona=``;
    if(searchmood == 'title')  //search with title
        {
           
        
            for(let i =0 ; i<productList.length ; i++)
            {

              if(productList[i].title.includes(searchInput.value.toLowerCase()))
              {
                  cartona+=` <tr>
                  <td>${i+1}</td>
                  <td>${productList[i].title}</td>
                  <td>${productList[i].price}</td>
                  <td>${productList[i].taxes? productList[i].taxes:0}</td>
                  <td>${productList[i].ads? productList[i].ads:0}</td>
                  <td>${productList[i].discount?productList[i].discount:0}</td>
                  <td>${productList[i].total}</td>
                  
                  <td>${productList[i].category}</td>
                  
                  <td ><button onclick="editProduct(${i})" id="update">update</button></td>
                  <td ><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
              </tr>`
                  
              }
            }
            
        }  


      else  //searc with cateregory
      {
        if(productList[i].category.includes(searchInput.value.toLowerCase()))
            {
                cartona+=` <tr>
                <td>${i+1}</td>
                <td>${productList[i].title}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].taxes? productList[i].taxes:0}</td>
                <td>${productList[i].ads? productList[i].ads:0}</td>
                <td>${productList[i].discount?productList[i].discount:0}</td>
                <td>${productList[i].total}</td>
                
                <td>${productList[i].category}</td>
                
                <td ><button onclick="editProduct(${i})" id="update">update</button></td>
                <td ><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`
                
            }
      }  
      tableBody.innerHTML=cartona;
    
})