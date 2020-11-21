const suggestionslist = document.querySelector("#slist");
const search = document.querySelector("#searchSuggestion");

// create element and render suggestions
function renderSuggestions(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let suggested = document.createElement('span');
    let date = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().s_Name;
    suggested.textContent = doc.data().s_suggest;
    date.textContent = doc.data().s_Date;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(date);
    li.appendChild(suggested);
    li.appendChild(cross)

    suggestionslist.appendChild(li);

    //delete Data
    cross.addEventListener('click', (e) =>{
        if(!confirm('Are you sure?')){
            e.preventDefault();
            return false;
        }
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Suggestions').doc(id).delete();
    })
}

//Fetch Data
// db.collection('Suggestions').orderBy('s_Date','desc').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc =>{
//         renderSuggestions(doc);
//     })
// })

//add Data
search.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Suggestions').add()
    // Add here 
})

//real-time listener
db.collection('Suggestions').orderBy('s_Date','desc').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderSuggestions(change.doc);
        } 
        else if(change.type == 'removed'){
            let li = suggestionslist.querySelector('[data-id='+ change.doc.id +']');
            suggestionslist.removeChild(li)
        }
    })
})