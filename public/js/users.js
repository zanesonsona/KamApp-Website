const userslist = document.querySelector("#ulist");

// create element and render suggestions
function renderUsers(doc){
    let li = document.createElement('li');
    let email = document.createElement('span');
    let name = document.createElement('span');
    let age = document.createElement('span');
    let gender = document.createElement('span');
    let birthdate = document.createElement('span');
    let address = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    email.textContent = doc.data().email;
    name.textContent = 'Name: '+doc.data().fullname;
    age.textContent = 'Age: '+doc.data().age;
    gender.textContent = 'Gender: '+doc.data().gender;
    birthdate.textContent = 'Birthdate: '+doc.data().birthday;
    address.textContent = 'Address: '+doc.data().address;
    cross.textContent = 'x';

    li.appendChild(email);
    li.appendChild(name);
    li.appendChild(age);
    li.appendChild(gender)
    li.appendChild(birthdate)
    li.appendChild(address)
    li.appendChild(cross)

    userslist.appendChild(li);

    //delete Data
    cross.addEventListener('click', (e) =>{
        if(!confirm('Are you sure?')){
            e.preventDefault();
            return false;
        }
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Users').doc(id).delete();
    })
}

//Fetch Data
// db.collection('Suggestions').orderBy('s_Date','desc').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc =>{
//         renderSuggestions(doc);
//     })
// })

//add Data

//real-time listener
db.collection('Users').orderBy('fullname').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderUsers(change.doc);
        } 
        else if(change.type == 'removed'){
            let li = userslist.querySelector('[data-id='+ change.doc.id +']');
            userslist.removeChild(li)
        }
    })
})