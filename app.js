//initialise firebase with your config
firebase.initializeApp({
    apiKey: "AIzaSyDWFr3Hvk21YsAd7M8_Hi7RGxd5yE95ouU",
    authDomain: "plp-web-f5.firebaseapp.com",
    projectId: "plp-web-f5",


});
const db=firebase.firestore();
//function to add task
function addTask(){
    const taskInput=document.getElementById("task-input");
    const task=taskInput.ariaValueMax.trim();
    if(task!==""){
        db.collection("tasks").add({
            task:task,
            timestamp:firebase.firestore.Fieldvalue.serverTimestamp(),
        })
        taskInput.value="";
    }
}
//function to render tasks
function rendertasks(doc){
    const taskList=document.getElementById("task-list");
    const taskItem=document.createElement("li");
    taskItem.className="task-item";
    taskItem.innerHTML=`
     <span>${doc.data().task}</span> 
     <button onclick="deleteTask('${doc.id}')">Delete</button>
      `;
    taskList.appendChild(taskItem);
}
//real timelistener for tasks
db.collection("tasks")
 .orderBY("timestamp","desc")
 .OnSnapshot(snapshot=>{
    const changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type==="added"){
          rendertasks(change.doc);
        }    
    });
 });
 //function to delete a task
 function deleteTask(id){
    db.collection("tasks").doc(id).delete();
 }
