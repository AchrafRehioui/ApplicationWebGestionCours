const list = document.querySelector('ul');
const form = document.querySelector('form');

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

AjoutCours = cours => {
    const html = `
        <li class="list-group-item">
            <h3>${cours.title}</h3>
            <small>${cours.created_at.toDate()}</small>
        </li>    
    `
    list.innerHTML += html;
}

db.collection("cours").get()
    .then(res => res.docs.forEach(cours => {
        AjoutCours(cours.data())
    }))
    .catch(err => console.error(err))

