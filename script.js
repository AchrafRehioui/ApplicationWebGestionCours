const list = document.querySelector('ul');
const form = document.querySelector('form');

list.addEventListener('click', e => {
    if(e.target.tagName === "BUTTON"){
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection("cours").doc(id).delete()
            .then(() => console.log('supprimé'))
            .catch(err => console.error(err))
    }
})

form.addEventListener('submit', e => {
    
    //sousmission du formulaire
    e.preventDefault();

    const now = new Date();

    const cours = {
        title: form.cours.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }

    db.collection("cours").add(cours)
        .then(res => form.reset())
        .catch(err => console.error(err))

})

AjoutCours = (cours, id) => {

    const html = `
        <li class="list-group-item" data-id="${id}">
            <h3>${cours.title}</h3>
            <small>${cours.created_at.toDate()}</small>
            <button class ="btn btn-danger btn-sm my-3">Supprimer</button>
        </li>    
       `
    list.innerHTML += html;
}


const deleteCours = id => {
    if( !confirm ('Vous etes sur de supprimer ce cours')){
        return;
    }
    const c1 = document.querySelectorAll('li');
    c1.forEach(c => {
        if(c.getAttribute('data-id') === id ){
            c.remove();
        }
    } )
}

db.collection("cours").onSnapshot(snap => { 
    console.log(snap.docChanges())

    snap.docChanges().forEach(c => {
    console.log(c.doc.id)

    if(c.type === "added"){
        AjoutCours(c.doc.data(), c.doc.id)
    } else {
        deleteCours(c.doc.id);
    }
})
})
    

