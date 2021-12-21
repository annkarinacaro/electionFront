export default () => {
    const main = document.querySelector(".content");
    fetch("./pages/main/main.html")
        .then((response) => response.text())
        .then((html) => {
            main.innerHTML = html;
            getAllCandidates();
        });
};

const backendURL = "http://localhost:8080";

function getAllCandidates() {
    fetch(backendURL + "/candidates")
        .then((response) => response.json())
        .then((candidates) => {
            candidates.forEach((element) => console.log(element));

            const tableElement = document.querySelector(
                "table.candidate-table"
            );
            tableElement.innerHTML = `
    <tr>
    
    <th>Name</th>
    <th>Party id</th>
    <th>Party Name</th>
    <th>Delete</th>
    </tr>
    `;

            candidates.forEach((element) => {
                const trElement = document.createElement("tr");
                trElement.dataset.id = element.id;
                tableElement.appendChild(trElement);

                const nameTdElement = document.createElement("td");
                nameTdElement.innerHTML = element.name;
                trElement.appendChild(nameTdElement);

                const partyIdTdElement = document.createElement("td");
                partyIdTdElement.innerHTML = element.partyId.partyId;
                trElement.appendChild(partyIdTdElement);

                const partyNameTdElement = document.createElement("td");
                partyNameTdElement.innerHTML = element.partyId.partyName;
                trElement.appendChild(partyNameTdElement);

                const deleteTdElement = document.createElement("td");
                trElement.appendChild(deleteTdElement);

                const deleteButtonElement = document.createElement("button");
                deleteButtonElement.innerHTML = "delete";
                deleteButtonElement.classList.add("cta");
                deleteButtonElement.addEventListener("click", () => {
                    fetch(backendURL + "/candidate/" + element.id, {
                        method: "DELETE",
                    })
                        .then((response) => response.text())
                        .then(() => {
                            tableElement.removeChild(trElement);
                        });
                });
                deleteTdElement.appendChild(deleteButtonElement);
            });

            const createBtn = document.querySelector("button");

            createBtn.addEventListener("click", () => {
                const name1 = document.querySelector(".name").value;
                const partyId = document.querySelector(".partyId").value;

                fetch("http://localhost:8080/candidate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: name1, party_id: partyId }),
                })
                    .then((response) => response.text())
                    .then((candidate) => {
                        console.log(inputName);
                    });
            });
        });
}
