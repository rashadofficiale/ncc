// weakness.js - NEW FILE
document.addEventListener('DOMContentLoaded', function() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    loadWeaknesses();
  });

  const subjectInput = document.getElementById("weakSubject");
  const chapterInput = document.getElementById("weakChapter");
  const notesInput = document.getElementById("weakNotes");
  const saveBtn = document.getElementById("saveWeakBtn");
  const listDiv = document.getElementById("weakList");

  function loadWeaknesses() {
    db.collection("weaknesses")
      .where("userId", "==", auth.currentUser.uid)
      .get()
      .then(snapshot => {
        listDiv.innerHTML = "";
        snapshot.forEach(doc => {
          const d = doc.data();
          listDiv.innerHTML += `
            <div style="background:rgba(255,255,255,0.05);padding:15px;margin:10px 0;border-radius:12px;border-left:3px solid #ff2d95;">
              <div style="display:flex;justify-content:space-between;">
                <b>${d.subject}</b> - ${d.chapter}
              </div>
              <div style="margin-top:8px;color:rgba(255,255,255,0.7);font-size:0.9rem;">
                ${d.notes}
              </div>
            </div>
          `;
        });
      });
  }

  saveBtn.onclick = () => {
    if (!subjectInput.value || !chapterInput.value) {
      alert("Please fill subject and chapter!");
      return;
    }
    
    db.collection("weaknesses").add({
      subject: subjectInput.value,
      chapter: chapterInput.value,
      notes: notesInput.value || "",
      userId: auth.currentUser.uid,
      createdAt: new Date()
    }).then(() => {
      subjectInput.value = "";
      chapterInput.value = "";
      notesInput.value = "";
      loadWeaknesses();
    });
  };
});
