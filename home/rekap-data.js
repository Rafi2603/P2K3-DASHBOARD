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

  // Rekap Data K3
  const tableBodyRekap = document.getElementById("table-body-rekap");
  const searchBarRekap = document.getElementById("search-bar-rekap");
  const addDataBtnRekap = document.getElementById("add-data-btn-rekap");
  const exportCsvBtnRekap = document.getElementById("export-csv-btn-rekap");
  const addModalRekap = document.getElementById("add-data-modal-rekap");
  const closeModalRekap = document.getElementById("close-modal-rekap");
  const addDataFormRekap = document.getElementById("add-data-form-rekap");
  const editModalRekap = document.getElementById("edit-data-modal-rekap");
  const closeEditModalRekap = document.getElementById("close-edit-modal-rekap");
  const editDataFormRekap = document.getElementById("edit-data-form-rekap");

  let rekapData = [];

  // Fungsi untuk format tanggal ke format DD-MM-YYYY
  function formatTanggal(tanggal) {
     const date = new Date(tanggal);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, "0");
     const day = String(date.getDate()).padStart(2, "0");
     return `${day}-${month}-${year}`;
  }

  // Fetch data Struktur Organisasi
  fetch("https://server-7717-610595966616.asia-southeast2.run.app/getstruktur")
     .then((response) => response.json())
     .then((data) => {
        currentData = data.data || [];
        renderTable(currentData);

        searchBar.addEventListener("input", () => {
          const searchTerm = searchBar.value.toLowerCase();
      
          const filteredItems = currentData.filter((item) =>
              item.nama.toLowerCase().includes(searchTerm) ||
              item.jabatan.toLowerCase().includes(searchTerm) ||
              item.posisi.toLowerCase().includes(searchTerm)
          );
      
          renderTable(filteredItems);
      });
     });

  // Fetch data Personel Ahli K3
  fetch("https://server-7717-610595966616.asia-southeast2.run.app/getpersonel")
     .then((response) => response.json())
     .then((data) => {
        personelData = data.data || [];
        renderTablePersonel(personelData);

        searchBarPersonel.addEventListener("input", () => {
          const searchTerm = searchBarPersonel.value.toLowerCase();
      
          const filteredItems = personelData.filter((item) =>
              item.nama.toLowerCase().includes(searchTerm) ||
              item.keahlian.toLowerCase().includes(searchTerm) ||
              item.batas_masa_berlaku.toLowerCase().includes(searchTerm)
          );
      
          renderTablePersonel(filteredItems);
      });
     });

  // Fetch data Personel Ahli K3
  fetch("https://server-7717-610595966616.asia-southeast2.run.app/getrekap")
     .then((response) => response.json())
     .then((data) => {
      rekapData = data.data || [];
      console.log(data); // Pastikan incident_rate ada di data
      renderTableRekap(rekapData);

        searchBarRekap.addEventListener("input", () => {
          const searchTerm = searchBarRekap.value.toLowerCase();
      
          const filteredItems = rekapData.filter((item) =>
              item.nama.toLowerCase().includes(searchTerm) ||
              item.keahlian.toLowerCase().includes(searchTerm) ||
              item.batas_masa_berlaku.toLowerCase().includes(searchTerm)
          );
      
          renderTableRekap(filteredItems);
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

     // Add Event Listeners to Delete Buttons
     const deleteButtons = document.querySelectorAll(".delete-btn");
     deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
           const id = e.target.dataset.id;

           // Confirm Delete
           if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
              fetch(`https://server-7717-610595966616.asia-southeast2.run.app/deletestruktur`, {
                    method: "DELETE",
                    headers: {
                       "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                       struktur_id: id
                    }),
                 })
                 .then((response) => {
                    if (!response.ok) {
                       throw new Error("Failed to delete data");
                    }
                    return response.json();
                 })
                 .then(() => {
                    alert("Data berhasil dihapus");
                    currentData = currentData.filter((item) => item.struktur_id != id); // Hapus dari array lokal
                    renderTable(currentData); // Render ulang tabel
                 })
                 .catch((error) => {
                    console.error("Error deleting data:", error);
                    alert("Error deleting data");
                 });
           }
        });
     });


  }


  // Fungsi render tabel Personel Ahli K3
  function renderTablePersonel(data) {
     tableBodyPersonel.innerHTML = ""; // Kosongkan tabel
     data.forEach((item) => {
        const formattedDate = item.batas_masa_berlaku ? formatTanggal(item.batas_masa_berlaku) : "";
        tableBodyPersonel.innerHTML += `
     <tr>
       <td>${item.nama}</td>
       <td>${item.keahlian}</td>
       <td>${formattedDate}</td> 
       <td>
         <button class="edit-btn-personel" 
                 data-id="${item.personel_k3_id}" 
                 data-nama="${item.nama}" 
                 data-keahlian="${item.keahlian}" 
                 data-batas="${item.batas_masa_berlaku}">
           Edit
         </button>
         <button class="delete-btn-personel" 
                 data-id="${item.personel_k3_id}">
           Delete
         </button>
       </td>
     </tr>`;
     });

     // Add Event Listeners to Edit Buttons
     const editButtonsPersonel = document.querySelectorAll(".edit-btn-personel");
     editButtonsPersonel.forEach((btn) => {
        btn.addEventListener("click", (e) => {
           const id = e.target.dataset.id;
           const nama = e.target.dataset.nama;
           const keahlian = e.target.dataset.keahlian;
           const batas = e.target.dataset.batas;

           // Isi modal dengan data yang dipilih
           document.getElementById("edit-id-personel").value = id;
           document.getElementById("edit-nama-personel").value = nama;
           document.getElementById("edit-keahlian-personel").value = keahlian;
           document.getElementById("edit-batas-masa-berlaku-personel").value = batas;

           // Tampilkan modal edit
           editModalPersonel.style.display = "block";
        });
     });

     // Add Event Listeners to Delete Buttons
     const deleteButtonsPersonel = document.querySelectorAll(".delete-btn-personel");
     deleteButtonsPersonel.forEach((btn) => {
        btn.addEventListener("click", (e) => {
           const id = e.target.dataset.id;

           // Konfirmasi sebelum menghapus data
           if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
              fetch(`https://server-7717-610595966616.asia-southeast2.run.app/deletepersonel`, {
                    method: "DELETE",
                    headers: {
                       "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                       personel_k3_id: id
                    }),
                 })
                 .then((response) => {
                    if (!response.ok) {
                       throw new Error("Gagal menghapus data");
                    }
                    return response.json();
                 })
                 .then(() => {
                    alert("Data berhasil dihapus");
                    personelData = personelData.filter((item) => item.personel_k3_id != id); // Hapus data dari array lokal
                    renderTablePersonel(personelData); // Render ulang tabel
                 })
                 .catch((error) => {
                    console.error("Error deleting data:", error);
                    alert("Gagal menghapus data");
                 });
           }
        });
     });
  }


// Fungsi render tabel Rekap Data K3
function renderTableRekap(data) {
  tableBodyRekap.innerHTML = "";
  data.forEach((item) => {
    tableBodyRekap.innerHTML += `
      <tr>
        <td>${item.tahun}</td>
        <td>${item.bulan}</td>
        <td>${item.jumlah_karyawan}</td>
        <td>${item.jumlah_hari_kerja}</td>
        <td>${item.jumlah_jam_kerja}</td>
        <td>${item.kecelakaan_berat}</td>
        <td>${item.kecelakaan_ringan}</td>
        <td>${item.kecelakaan_meninggal}</td>
        <td>${item.near_miss}</td>
        <td>${item.fire_accident}</td>
        <td>${item.damaged_property}</td>
        <td>${item.jumlah_hari_hilang}</td>
        <td>${item.jumlah_hari_tanpa_hilang}</td>
        <td>${item.lti}</td>
        <td>${item.man_hour}</td>
        <td>${item.frequency_rate}</td>
        <td>${item.severity_rate}</td>

        <td>${item.incident_rate ? `${item.incident_rate.toFixed(2)}%` : 'N/A'}</td>

        <td>${item.atlr}</td>
        <td>
          <button class="edit-btn-rekap" 
                  data-id="${item.rekapdata_id}" 
                  data-tahun="${item.tahun}" 
                  data-bulan="${item.bulan}" 
                  data-jumlah_karyawan="${item.jumlah_karyawan}"
                  data-jumlah_hari_kerja="${item.jumlah_hari_kerja}" 
                  data-kecelakaan_berat="${item.kecelakaan_berat}" 
                  data-kecelakaan_ringan="${item.kecelakaan_ringan}" 
                  data-kecelakaan_meninggal="${item.kecelakaan_meninggal}" 
                  data-near_miss="${item.near_miss}" 
                  data-fire_accident="${item.fire_accident}" 
                  data-damaged_property="${item.damaged_property}" 
                  data-jumlah_hari_hilang="${item.jumlah_hari_hilang}" >
            Edit
          </button>
          <button class="delete-btn-rekap" data-id="${item.rekapdata_id}">Delete</button>
        </td>
      </tr>
    `;
  });

  // Add Event Listeners to Edit Buttons
  const editButtons = document.querySelectorAll(".edit-btn-rekap");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const data = e.target.dataset;

      // Populate Edit Modal
      document.getElementById("edit-id-rekap").value = data.id;
      document.getElementById("edit-tahun").value = data.tahun;
      document.getElementById("edit-bulan").value = data.bulan;
      
      document.getElementById("edit-jumlah-karyawan").value = data.jumlah_karyawan;
      document.getElementById("edit-jumlah-hari-kerja").value = data.jumlah_hari_kerja;

      document.getElementById("edit-kecelakaan-berat").value = data.kecelakaan_berat;
      document.getElementById("edit-kecelakaan-ringan").value = data.kecelakaan_ringan;
      document.getElementById("edit-kecelakaan-meninggal").value = data.kecelakaan_meninggal;
      document.getElementById("edit-near-miss").value = data.near_miss;
      document.getElementById("edit-fire-accident").value = data.fire_accident;
      document.getElementById("edit-damaged-property").value = data.damaged_property;
      document.getElementById("edit-jumlah-hari-hilang").value = data.jumlah_hari_hilang;


      // Show Edit Modal
      editModalRekap.style.display = "block";
    });
  });

  // Add Event Listeners to Delete Buttons
  const deleteButtons = document.querySelectorAll(".delete-btn-rekap");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;

      // Confirm Delete
      if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        fetch(`https://server-7717-610595966616.asia-southeast2.run.app/deleterekap`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rekapdata_id: id }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Gagal menghapus data");
            }
            return response.json();
          })
          .then(() => {
            alert("Data berhasil dihapus");
            rekapData = rekapData.filter((item) => item.rekapdata_id != id);
            renderTableRekap(rekapData);
          })
          .catch((error) => {
            console.error("Error deleting Rekap K3 data:", error);
          });
      }
    });
  });
}



  // Show Modal STRUKTUR
  addDataBtn.addEventListener("click", () => {
     modal.style.display = "block";
  });

  // Show Modal PERSONEL
  addDataBtnPersonel.addEventListener("click", () => {
     addModalPersonel.style.display = "block"; // Gunakan modal personel yang benar
  });

  // Show Modal REKAP
    addDataBtnRekap.addEventListener("click", () => {
      addModalRekap.style.display = "block"; // Gunakan modal personel yang benar
  });

  // Close Modal STRUKTUR
  closeModal.addEventListener("click", () => {
     modal.style.display = "none";
  });

  // Close Modal PERSONEL
  closeModalPersonel.addEventListener("click", () => {
     addModalPersonel.style.display = "none"; // Gunakan modal personel yang benar
  });

    // Close Modal REKAP
    closeModalRekap.addEventListener("click", () => {
      addModalRekap.style.display = "none"; // Gunakan modal personel yang benar
   });


  // Submit Form Data STRUKTUR
  addDataForm.addEventListener("submit", (e) => {
     e.preventDefault();

     const formData = {
        nama: document.getElementById("nama").value,
        jabatan: document.getElementById("jabatan").value,
        posisi: document.getElementById("posisi").value,
     };

     fetch("https://server-7717-610595966616.asia-southeast2.run.app/addstruktur", {
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

  // Submit Form Data PERSONEL
  addDataFormPersonel.addEventListener("submit", (e) => {
     e.preventDefault();

     const formData = {
        nama: document.getElementById("nama-personel").value,
        keahlian: document.getElementById("keahlian-personel").value,
        batas_masa_berlaku: document.getElementById("batas-masa-berlaku-personel").value,
     };

     fetch("https://server-7717-610595966616.asia-southeast2.run.app/addpersonel", {
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
           addModalPersonel.style.display = "none";
           window.location.reload(); // Reload halaman untuk memperbarui tabel
        })
        .catch((error) => {
           console.error("Error adding data:", error);
           alert("Error adding data");
        });
  });


  // Submit Form Data Rekap K3
  addDataFormRekap.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = {
          tahun: document.getElementById("tahun").value,
          bulan: document.getElementById("bulan").value,
          jumlah_karyawan: document.getElementById("jumlah-karyawan").value,
          jumlah_hari_kerja: document.getElementById("jumlah-hari-kerja").value,
          kecelakaan_berat: document.getElementById("kecelakaan-berat").value,
          kecelakaan_ringan: document.getElementById("kecelakaan-ringan").value,
          kecelakaan_meninggal: document.getElementById("kecelakaan-meninggal").value,
          near_miss: document.getElementById("near-miss").value,
          fire_accident: document.getElementById("fire-accident").value,
          damaged_property: document.getElementById("damaged-property").value,
          jumlah_hari_hilang: document.getElementById("jumlah-hari-hilang").value,
      };
  
      fetch("https://server-7717-610595966616.asia-southeast2.run.app/addrekap", {
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
              addModalRekap.style.display = "none";
              window.location.reload(); // Reload halaman untuk memperbarui tabel
          })
          .catch((error) => {
              console.error("Error adding Rekap K3 data:", error);
              alert("Error adding data");
          });
  });
  


  // Close Edit Modal STRUKTUR
  closeEditModal.addEventListener("click", () => {
     editModal.style.display = "none";
  });

  // Close Edit Modal PERSONEL
  closeEditModalPersonel.addEventListener("click", () => {
     editModalPersonel.style.display = "none";
  });

  // Close Edit Modal PERSONEL
  closeEditModalRekap.addEventListener("click", () => {
    editModalRekap.style.display = "none";
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
  
      fetch("https://server-7717-610595966616.asia-southeast2.run.app/updatestruktur", {
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

  // Submit Edit Data Personel
  editDataFormPersonel.addEventListener("submit", (e) => {
     e.preventDefault();

     const formData = {
        personel_id: document.getElementById("edit-id-personel").value,
        nama: document.getElementById("edit-nama-personel").value,
        keahlian: document.getElementById("edit-keahlian-personel").value,
        batas_masa_berlaku: document.getElementById("edit-batas-masa-berlaku-personel").value,
     };

     fetch("https://server-7717-610595966616.asia-southeast2.run.app/updatepersonel", {
           method: "PUT",
           headers: {
              "Content-Type": "application/json",
           },
           body: JSON.stringify(formData),
        })
        .then((response) => {
           if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
           }
           return response.json();
        })
        .then(() => {
           alert("Data berhasil diperbarui");
           editModalPersonel.style.display = "none";
           window.location.reload(); // Reload halaman untuk memperbarui tabel
        })
        .catch((error) => {
           console.error("Error updating data:", error);
           alert("Error updating data");
        });
  });


  // Submit Edit Data Rekap
  editDataFormRekap.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    rekapdata_id: document.getElementById("edit-id-rekap").value,
    tahun: document.getElementById("edit-tahun").value,
    bulan: document.getElementById("edit-bulan").value,
    jumlah_karyawan: document.getElementById("edit-jumlah-karyawan").value,
    jumlah_hari_kerja: document.getElementById("edit-jumlah-hari-kerja").value,
    kecelakaan_berat: document.getElementById("edit-kecelakaan-berat").value,
    kecelakaan_ringan: document.getElementById("edit-kecelakaan-ringan").value,
    kecelakaan_meninggal: document.getElementById("edit-kecelakaan-meninggal").value,
    near_miss: document.getElementById("edit-near-miss").value,
    fire_accident: document.getElementById("edit-fire-accident").value,
    damaged_property: document.getElementById("edit-damaged-property").value,
    jumlah_hari_hilang: document.getElementById("edit-jumlah-hari-hilang").value,
  };

  fetch("https://server-7717-610595966616.asia-southeast2.run.app/updaterekap", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      alert("Data Rekap K3 berhasil diperbarui");
      editModalRekap.style.display = "none";
      window.location.reload(); // Reload halaman untuk memperbarui tabel
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      alert("Error updating data");
    });
});

  








});