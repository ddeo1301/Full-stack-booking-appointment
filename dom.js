window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://localhost:5500/user/get-users")
  .then((Response) => {
   for(var i = 0; i < Response.data.length; i++){
     showUserOnScreen(Response.data[i]);
   }
   console.log(Response)
  })
  .catch((error) => {
   console.log(error)
  })

})


function showUserOnScreen(obj){
  const parentElem = document.getElementById('listOfItem');
  const childElem = document.createElement('li');
 // parentElem.innerHTML = parentElem.innerHTML + `<li> ${obj.name} - ${obj.emailId} - ${obj.phoneNo} - ${obj.date} - ${obj.time} </li>`

   //const childElem = document.createElement('li');
  childElem.textContent = obj.name + ' - ' + obj.emailId + ' - ' + obj.phoneNo + ' - ' + obj.date + ' - ' + obj.time;
  parentElem.appendChild(childElem);

  const deleteButton = document.createElement('input');
  deleteButton.type = "button";
  deleteButton.value = 'Delete';
  deleteButton.onclick = () => {
      axios.delete(`https://localhost:5500/user/delete-user/${obj._id}`)
       .then((response) => {
          parentElem.removeChild(childElem);
       })
       .catch((err) => {
          console.log(err)
       })
      //localStorage.removeItem(obj.emailId);
      
  }

  const editButton = document.createElement('input');
  editButton.type = "button";
  editButton.value = 'Edit';
  editButton.onclick = () => {
      // localStorage.removeItem(obj.emailId);
      axios.delete(`https://localhost:5500/user/delete-user/${obj._id}`)
       .then((response) => {
          parentElem.removeChild(childElem);
       })
       .catch((err) => {
          console.log(err)
       })

      document.getElementById('name').value = obj.name;
      document.getElementById('email').value = obj.emailId;
      document.getElementById('tel').value = obj.phoneNo;
      document.getElementById('date').value = obj.date;
      document.getElementById('time').value = obj.time;
  }

   childElem.appendChild(deleteButton);
   childElem.appendChild(editButton);
  // parentElem.appendChild(childElem);
}


function registerUser(event){
    event.preventDefault();

    const name = event.target.name.value;
    const emailId = event.target.email.value;
    const phoneNo = event.target.phone.value;
    const date = event.target.date.value;
    const time = event.target.time.value
    
    const obj = {
        name,
        emailId,
        phoneNo,
        date,
        time
    }
    
    axios.post("https://localhost:5500/user/add-user", obj)
      .then((Response) => {
        showUserOnScreen(Response.data);
        console.log(Response);
      })
      .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + `<h4>Something Went Wrong</h4>`;
        console.log(err);
      })
    //let myobj = JSON.parse(localStorage.getItem(obj));
    // localStorage.setItem(emailId, JSON.stringify(obj));
    // showUserOnScreen(obj);
    
}