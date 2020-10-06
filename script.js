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
        .then(res => console.log(res, 'cours ajouté'))
        .catch(err => console.error(err))

})

AjoutCours = (cours, id) => {

    const html = `
        <li class="list-group-item" data-id="{${id}}">
            <h3>${cours.title}</h3>
            <small>${cours.created_at.toDate()}</small>
            <button class ="btn btn-danger btn-sm my-3">Supprimer</button>
        </li>    
       `
    list.innerHTML += html;
}

db.collection("cours").get()
    .then(res => res.docs.forEach(cours => {
        console.log(cours.id)
        AjoutCours(cours.data(), cours.id)
    }))
    .catch(err => console.error(err))

