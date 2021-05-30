if(localStorage.getItem("notes")==null){
    document.querySelector("body").style.backgroundSize="900px";
}
function showNotes(){ //Function to show saved notes
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    // Showing the title (part-2)

    let titles=localStorage.getItem("titles");
     if(titles==null){
         titleObj=[];
     }
     else
     {
         titleObj=JSON.parse(titles);
     }
    
    let html = "";
    notesObj.forEach(function(element,index) {
        //here
        
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">      
        <div class="card-body">
          <h5 class="card-title">Title: ${titleObj[index]}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;    

    });
    let notesElm=document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML='<h3 style="margin:auto; margin-bottom:80px; padding-top:45px">Nothing to show</h3>';
    }
      

}
  showNotes();
// Adding Notes to local Storage on Clicking The Add Button
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let text=document.getElementById('addTxt');
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(text.value);
    localStorage.setItem("notes",JSON.stringify(notesObj))
    text.value="";
    // Adding a title Feature(part-1)
     let title=prompt('Enter a title for the note');
     if(title!==null || title!==undefined){
     let titles=localStorage.getItem("titles");
     if(titles==null){
         titleObj=[];
     }
     else
     {
         titleObj=JSON.parse(titles);
     }
     titleObj.push(title);
     localStorage.setItem("titles",JSON.stringify(titleObj));
    
   
    }
     
    showNotes();

})
// Function to Delete a note from local Storage

function deleteNote(index){
    let x=prompt("Are you sure you want to delete this Note?(Y/N)");
    while(x =='Y'){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    
    let titles=localStorage.getItem("titles");
     if(titles==null){
         titleObj=[];
     }
     else
     {
         titleObj=JSON.parse(titles);
     }
    notesObj.splice(index,1);
    titleObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("titles",JSON.stringify(titleObj));
    showNotes();
    x='N';
}

}
// Search Optimisation
let searchTxt=document.getElementById('searchTxt');
searchTxt.addEventListener('input',function(){
    let searchVal=searchTxt.value;
    // console.log("Searching",searchVal);
    let cardElt=document.getElementsByClassName('noteCard');
    Array.from(cardElt).forEach(function(element){
        let cardTxt=element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(searchVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})

