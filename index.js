import {
    onGetClases,
    saveClase,
    deleteClase,
    getClase,
    updateClase,
    getClases,
} from "./firebase.js";

const matricualasForm = document.getElementById("matriculas-form");
const matriculasContainer = document.getElementById("matriculas-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async(e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });

    onGetClases((querySnapshot) => {
        matriculasContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const Clase = doc.data();

            matriculasContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${Clase.Asignatura_nombre}</h3>
      <p>${Clase.Asignatura_Descripción}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Borrar
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Editar
        </button>
      </div>
    </div>`;
        });

        const btnsDelete = matriculasContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async({ target: { dataset } }) => {
                try {
                    await deleteClase(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = matriculasContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async(e) => {
                try {
                    const doc = await getClase(e.target.dataset.id);
                    const Clase = doc.data();
                    matricualasForm["Asignatura_nombre"].value = Clase.Asignatura_nombre;
                    matricualasForm["Asignatura_Descripción"].value = Clase.Asignatura_Descripción;

                    editStatus = true;
                    id = doc.id;
                    matricualasForm["btn-matriculas-form"].innerText = "Update";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });
});

matricualasForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const Asignatura_nombre = matricualasForm["Asignatura_nombre"];
    const Asignatura_Descripción = matricualasForm["Asignatura_Descripción"];

    try {
        if (!editStatus) {
            await saveClase(Asignatura_nombre.value, Asignatura_Descripción.value);
        } else {
            await updateClase(id, {
                Asignatura_nombre: Asignatura_nombre.value,
                Asignatura_Descripción: Asignatura_Descripción.value,
            });

            editStatus = false;
            id = "";
            matricualasForm["btn-matriculas-form"].innerText = "Save";
        }

        matricualasForm.reset();
        title.focus();
    } catch (error) {
        console.log(error);
    }
});