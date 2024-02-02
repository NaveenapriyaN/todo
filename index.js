 let form= document.getElementById("form");
 let textinput=document.getElementById("title");
 let dateInput = document.getElementById("duedate");
 let textarea = document.getElementById("textarea");
 let msg = document.getElementById("msg");
 let tasks=document.getElementById("tasks");
 let add=document.getElementById("add")
 
 form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
 });

 let formValidation =()=>{
    if(title.value === ""){
        console.log('failure');
        msg.innerHTML = "Task cannot be blank"; 
    }
    else{
        console.log('success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        (()=>{
            add.setAttribute("data-bs-dismiss","");  
        })()
    }
 }


 let data=[];

 let acceptData=()=>{
    data.push({
    text:title.value,
    Date:duedate.value,
    Description:textarea.value,
    });

    localStorage.setItem("data",JSON.stringify(data));

    createTasks();
 }

 let createTasks = ()=>{
    tasks.innerHTML="";
    data.map((x,y)=>{
        return (tasks.innerHTML+=`
        <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.Date}</span>
                    <p>${x.Description}</p>
                    <span class="options">
                        <i onClick="deleteTask(this)" class="fa-solid fa-trash"></i>
                        <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                    </span>
                </div>
        `);
    })
   
    resetForm();
 };

let deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));
};

let editTask=(e)=>{
    let selectedTask = e.parentElement.parentElement;
    title.value=selectedTask.children[0].innerHtml;
    duedate.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
    deleteTask(e);
}

 let resetForm=()=>{
    title.value="";
    duedate.value="";
    textarea.value="";
 };


 (()=>{
    data= JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);   
    createTasks();
 })();