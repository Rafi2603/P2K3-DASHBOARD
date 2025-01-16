document.addEventListener("DOMContentLoaded", () => {
    // Struktur Organisasi
    const tableBody = document.getElementById("table-body-struktur");
    const searchBar = document.getElementById("search-bar-struktur");
    const addDataBtn = document.getElementById("add-data-btn-struktur");
    const modal = document.getElementById("add-data-modal-struktur");
    const closeModal = document.getElementById("close-modal-struktur");
    const addDataForm = document.getElementById("add-data-form-struktur");
    const editModal = document.getElementById("edit-data-modal-struktur");
    const closeEditModal = document.getElementById("close-edit-modal-struktur");
    const editDataForm = document.getElementById("edit-data-form-struktur");
    const exportCsvBtn = document.getElementById("export-csv-btn-struktur");
  
    let currentData = [];
  
    // Personel Ahli K3
    const tableBodyPersonel = document.getElementById("table-body-personel");
    const searchBarPersonel = document.getElementById("search-bar-personel");
    const addDataBtnPersonel = document.getElementById("add-data-btn-personel");
    const exportCsvBtnPersonel = document.getElementById("export-csv-btn-personel");
    const addModalPersonel = document.getElementById("add-data-modal-personel");
    const closeModalPersonel = document.getElementById("close-modal-personel");
    const addDataFormPersonel = document.getElementById("add-data-form-personel");
    const editModalPersonel = document.getElementById("edit-data-modal-personel");
    const closeEditModalPersonel = document.getElementById("close-edit-modal-personel");
    const editDataFormPersonel = document.getElementById("edit-data-form-personel");
  
    let personelData = [];
  
    // Fungsi untuk format tanggal ke format DD-MM-YYYY
    function formatTanggal(tanggal) {
      const date = new Date(tanggal);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    }
  
    // Fetch data Struktur Organisasi
    fetch("http://localhost:3000/getstruktur")
      .then((response) => response.json())
      .then((data) => {
        currentData = data.data || [];
        renderTable(currentData);
  
        searchBar.addEventListener("input", () => {
          const filteredItems = currentData.filter((item) =>
            item.nama.toLowerCase().includes(searchBar.value.toLowerCase())
          );
          renderTable(filteredItems);
        });
      });
  
    // Fetch data Personel Ahli K3
    fetch("http://localhost:3000/getpersonel")
      .then((response) => response.json())
      .then((data) => {
        personelData = data.data || [];
        renderTablePersonel(personelData);
  
        searchBarPersonel.addEventListener("input", () => {
          const filteredItems = personelData.filter((item) =>
            item.nama.toLowerCase().includes(searchBarPersonel.value.toLowerCase())
          );
          renderTablePersonel(filteredItems);
        });
      });
  
    // Fungsi render tabel Struktur Organisasi
    function renderTable(data) {
      tableBody.innerHTML = "";
      data.forEach((item) => {
        const formattedDate = item.tanggal_input ? formatTanggal(item.tanggal_input) : "";
        tableBody.innerHTML += `
          <tr>
            <td>${item.nama}</td>
            <td>${item.jabatan}</td>
            <td>${item.posisi}</td>
            <td>${formattedDate}</td>
            <td>
              <button class="edit-btn" data-id="${item.struktur_id}" data-nama="${item.nama}" data-jabatan="${item.jabatan}" data-posisi="${item.posisi}">Edit</button>
              <button class="delete-btn" data-id="${item.struktur_id}">Delete</button>
            </td>
          </tr>`;
      });
    }
  
    // Fungsi render tabel Personel Ahli K3
    function renderTablePersonel(data) {
      tableBodyPersonel.innerHTML = "";
      data.forEach((item) => {
        tableBodyPersonel.innerHTML += `
          <tr>
            <td>${item.nama}</td>
            <td>${item.keahlian}</td>
            <td>${item.batas_masa_berlaku}</td>
            <td>
              <button class="edit-btn-personel" data-id="${item.personel_k3_id}">Edit</button>
              <button class="delete-btn-personel" data-id="${item.personel_k3_id}">Delete</button>
            </td>
          </tr>`;
      });
    }
  
      // Add Event Listeners to Edit Buttons
      const editButtons = document.querySelectorAll(".edit-btn");
      editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          const nama = e.target.dataset.nama;
          const jabatan = e.target.dataset.jabatan;
          const posisi = e.target.dataset.posisi;
  
          document.getElementById("edit-id").value = id;
          document.getElementById("edit-nama").value = nama;
          document.getElementById("edit-jabatan").value = jabatan;
          document.getElementById("edit-posisi").value = posisi;
  
          editModal.style.display = "block";
        });
      });
  
  // Show Modal STRUKTUR
  addDataBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });
  
  // Close Modal STRUKTUR
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
    // Submit Form Data STRUKTUR
    addDataForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = {
        nama: document.getElementById("nama").value,
        jabatan: document.getElementById("jabatan").value,
        posisi: document.getElementById("posisi").value,
      };
  
      fetch("http://localhost:3000/addstruktur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add data");
          }
          return response.json();
        })
        .then(() => {
          alert("Data berhasil ditambahkan");
          modal.style.display = "none";
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding data:", error);
          alert("Error adding data");
        });
    });
  
    
    // Close Edit Modal
    closeEditModal.addEventListener("click", () => {
      editModal.style.display = "none";
    });
  
      // Submit Edit Data
      editDataForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = {
          struktur_id: document.getElementById("edit-id").value,
          nama: document.getElementById("edit-nama").value,
          jabatan: document.getElementById("edit-jabatan").value,
          posisi: document.getElementById("edit-posisi").value,
        };
    
        fetch("http://localhost:3000/updatestruktur", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update data");
            }
            return response.json();
          })
          .then(() => {
            alert("Data berhasil diperbarui");
            editModal.style.display = "none";
            window.location.reload(); // Reload halaman untuk memperbarui tabel
          })
          .catch((error) => {
            console.error("Error updating data:", error);
            alert("Error updating data");
          });
      });
  
  
  
  
  
  
  
  });
  