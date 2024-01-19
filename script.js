  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyByxQapsD9ndpy4I4RmMOS9EZR7pmI0A80",
    authDomain: "webdev---demo.firebaseapp.com",
    projectId: "webdev---demo",
    storageBucket: "webdev---demo.appspot.com",
    messagingSenderId: "589291520580",
    appId: "1:589291520580:web:15961a61a10eec96def211",
    measurementId: "G-R0MZX61K4L"
  };

  const table = document.querySelector('.programmingLng')
  const programmForm = document.querySelector('.addProgrammForm')
  const delForm = document.querySelector('.deleteForm')


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
//   console.log(db);
  
  const collReff = collection(db, 'programming languages')
  // const CollectDocs = getDocs(collReff);

  // CollectDocs.then((snapshot) => {
  //   let docList = [];
  //   snapshot.docs.forEach((doc) => {
  //       docList.push({...doc.data(),id : doc.id})
  //   });
  //   console.log(docList);
  //   addProgramms(docList)
  // })

  onSnapshot(collReff, (snapshot) => {
    let docList = [];
    snapshot.docs.forEach((doc) => {
        docList.push({...doc.data(),id : doc.id})
    });
    console.log(docList);
    addProgramms(docList)
  })

  const addProgramms = (docList) => {
    table.innerHTML = ` <tr>
                          <th>Programm Name</th>
                          <th>Designed By</th>
                          <th>Invented Year</th>
                          <th></th>
                        </tr>                          
                      `

    docList.forEach((doc) => {
      const html = `<tBody>
                    <tr>
                      <td>${doc.name}</td>
                      <td>${doc.designed_by}</td>
                      <td>${doc.invented_year}</td>
                      <td><button type="submit" class="delBtn">x</button></td>
                                          
                    </tr>
                    </tBody>`

                   table.innerHTML += html
    })

  }

  programmForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formObject = new FormData(programmForm)
    const payload = Object.fromEntries(formObject.entries())

    console.log(payload);

    addDoc(collReff, payload).then(() =>{
      programmForm.reset();

    })
  })

  delForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const delId = delForm.delId.value

    const delRef = doc(db, 'programming languages', delId);
    deleteDoc(delRef).then(() => {
      delForm.reset();
    })

  })