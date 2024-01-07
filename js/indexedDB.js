// Inisialisasi IndexedDB
var db;
var request = indexedDB.open('komentarDB', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("komen", "komen", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('nyak').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var komen = document.getElementById('komen').value;

    var transaction = db.transaction(['komentar'], 'readwrite');
    var objectStore = transaction.objectStore('komentar');
    var comment = { name: name, komen: komen };
    objectStore.add(comment);

    document.getElementById('name').value = '';
    document.getElementById('komen').value = '';

    // showComments();
});