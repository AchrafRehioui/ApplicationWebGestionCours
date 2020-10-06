const list = document.querySelector('ul');

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