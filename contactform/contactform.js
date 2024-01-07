// Inisialisasi IndexedDB
var request = window.indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("messages", { autoIncrement: true });
  objectStore.createIndex("nama", "nama", { unique: false });
  objectStore.createIndex("komentar", "komentar", { unique: false });
};

request.onsuccess = function(event) {
  var db = event.target.result;

  // Contact Form Submit
  $('form.contactForm').submit(function(event) {
    event.preventDefault();

    var nama = $('#nama').val();
    var komentar = $('#komentar').val();

    if (komentar === '') {
      alert("Komentar tidak boleh kosong.");
      return;
    }

    var transaction = db.transaction(["messages"], "readwrite");
    var objectStore = transaction.objectStore("messages");

    var message = {
      nama: nama,
      komentar: komentar
    };

    var request = objectStore.add(message);

    request.onsuccess = function() {
      console.log("Pesan Terkirim!");
      $('.contactForm').find("input, textarea").val("");
    };

    request.onerror = function(event) {
      console.log("Pesan tidak terkirim. Error: " + event.target.error.message);
    };
  });
};

request.onerror = function(event) {
  console.log("Error opening database");
};