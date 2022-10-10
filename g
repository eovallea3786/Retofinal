onGetEstudiantes((querySnapshot) => {
    matriculasContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const Estudiante = doc.data();

        matriculasContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${Estudiante.Estudiante_nombres}</h3>
      <p>${Estudiante.Estudiante_apellidos}</p>
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
                await deleteEstudiante(dataset.id);
            } catch (error) {
                console.log(error);
            }
        })
    );

    const btnsEdit = matriculasContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async(e) => {
            try {
                const doc = await getEstudiante(e.target.dataset.id);
                const Estudiante = doc.data();
                matricualasForm["Estudiante_nombres"].value = Estudiante.Estudiante_nombres;
                matricualasForm["Estudiante_apellidos"].value = Estudiante.Estudiante_apellidos;

                editStatus = true;
                id = doc.id;
                matricualasForm["btn-matriculas-form"].innerText = "Update";
            } catch (error) {
                console.log(error);
            }
        });
    });
});












e.preventDefault();

const Estudiante_nombres = matricualasForm["Estudiante_nombres"];
const Estudiante_apellidos = matricualasForm["Estudiante_apellidos"];

try {
    if (!editStatus) {
        await saveEstudiante(Estudiante_nombres.value, Estudiante_apellidos.value);
    } else {
        await updateEstudiante(id, {
            Estudiante_nombres: Estudiante_nombres.value,
            Estudiante_apellidos: Estudiante_apellidos.value,
        });

        editStatus = false;
        id = "";
        matricualasForm["btn-matriculas-form"].innerText = "Save";
    }

    matricualasForm.reset();
    Estudiante_nombres.focus();
} catch (error) {
    console.log(error);
}