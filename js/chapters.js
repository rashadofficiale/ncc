const firebaseConfig = {
  apiKey: "PASTE_KEY",
  authDomain: "PASTE_DOMAIN",
  projectId: "PASTE_ID",
  storageBucket: "PASTE_BUCKET",
  messagingSenderId: "PASTE_SENDER",
  appId: "PASTE_APPID"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const subjectInput = document.getElementById("subject");
const chapterInput = document.getElementById("chapter");
const addBtn = document.getElementById("addChapterBtn");
const listDiv = document.getElementById("chapterList");

addBtn.onclick = () => {
  db.collection("chapters").add({
    subject: subjectInput.value,
    chapter: chapterInput.value,
    completed: false
  }).then(()=>location.reload());
};

db.collection("chapters").get().then(snapshot=>{
  snapshot.forEach(doc=>{
    const d = doc.data();

    listDiv.innerHTML += `
      <p>
        <b>${d.subject}</b> - ${d.chapter}
        <button onclick="toggle('${doc.id}',${d.completed})">
          ${d.completed ? "Completed" : "Mark Done"}
        </button>
      </p>
    `;
  });
});

function toggle(id,status){
  db.collection("chapters").doc(id).update({
    completed: !status
  }).then(()=>location.reload());
}
