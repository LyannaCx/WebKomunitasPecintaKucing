// Setelah userData dibuat
let users = JSON.parse(localStorage.getItem("pawpaw_users")) || [];

// default status user = Aktif
users.push({
    username: username,
    password: password,
    email: email,
    status: "Aktif",
    role: role
});

localStorage.setItem("pawpaw_users", JSON.stringify(users));


/* ---------------- GALERI ---------------- */
function uploadFoto() {
    const fileInput = document.getElementById("uploadImage");
    const galeriList = document.getElementById("galeriList");

    if (!fileInput || !galeriList) {
        console.error("Element galeriList atau uploadImage tidak ditemukan!");
        return;
    }

    if (fileInput.files.length === 0) {
        alert("Pilih foto dahulu!");
        return;
    }

    const file = fileInput.files[0];
    const imgURL = URL.createObjectURL(file);

    const newItem = {
        src: imgURL,
        likes: 0
    };

    let galeri = JSON.parse(localStorage.getItem("galeri") || "[]");
    galeri.push(newItem);
    localStorage.setItem("galeri", JSON.stringify(galeri));

    loadGaleri(); // refresh tampilan
}


function loadGaleri() {
    const galeriList = document.getElementById("galeriList");
    if (!galeriList) return;

    galeriList.innerHTML = "";

    let galeri = JSON.parse(localStorage.getItem("galeri") || "[]");

    galeri.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("galeri-item");
        div.innerHTML = `
            <img src="${item.src}">
            <div class="like-section">
                <button class="like-btn ${item.likes > 0 ? "liked" : ""}" data-index="${index}">❤️</button>
                <span class="like-count">${item.likes}</span>
            </div>
        `;
        galeriList.appendChild(div);
    });

    attachLikeEvents();
}


function attachLikeEvents() {
    const buttons = document.querySelectorAll(".like-btn");

    let galeri = JSON.parse(localStorage.getItem("galeri") || "[]");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const i = btn.dataset.index;

            if (btn.classList.contains("liked")) {
                galeri[i].likes--;
                btn.classList.remove("liked");
            } else {
                galeri[i].likes++;
                btn.classList.add("liked");
            }

            localStorage.setItem("galeri", JSON.stringify(galeri));
            loadGaleri();
        });
    });
}

window.onload = loadGaleri;


/* ---------------- DISKUSI ---------------- */

function postingDiskusi() {
    let text = document.getElementById("postText").value;
    if (!text) return;

    let list = JSON.parse(localStorage.getItem("diskusi") || "[]");

    list.push({
        user: localStorage.getItem("username"),
        text: text,
        komentar: []
    });

    localStorage.setItem("diskusi", JSON.stringify(list));
    loadDiskusi();

    loadDiskusi();

    let posts = JSON.parse(localStorage.getItem("pawpaw_posts")) || [];

    posts.push({
        title: teksPost,          // isi postingan
        username: localStorage.getItem("username")
    });

    localStorage.setItem("pawpaw_posts", JSON.stringify(posts));
}

function loadDiskusi() {
    let list = JSON.parse(localStorage.getItem("diskusi") || "[]");
    let box = document.getElementById("diskusi-list");
    if (!box) return;

    box.innerHTML = "";

    list.forEach((p, i) => {
        box.innerHTML += `
            <div class="post-box">
                <b>${p.user}</b><br>
                <p>${p.text}</p>

                <input type="text" id="komen${i}" placeholder="Komentar...">
                <button onclick="kirimKomentar(${i})">Kirim</button>

                <div class="komentar">
                    ${p.komentar.map(k => `<p><b>${k.user}</b>: ${k.text}</p>`).join("")}
                </div>
            </div>
        `;
    });
}

function kirimKomentar(i) {
    let list = JSON.parse(localStorage.getItem("diskusi") || "[]");
    let isi = document.getElementById("komen" + i).value;

    list[i].komentar.push({
        user: localStorage.getItem("username"),
        text: isi
    });

    localStorage.setItem("diskusi", JSON.stringify(list));
    loadDiskusi();
}


/* ---------------- DONASI ---------------- */

function kirimDonasi() {
    let nama = document.getElementById("donatur").value;
    let jumlah = document.getElementById("nominal").value;

    if (!nama || !jumlah) return alert("Isi semua data!");

    let list = JSON.parse(localStorage.getItem("donasi") || "[]");

    list.push({nama, jumlah});
    localStorage.setItem("donasi", JSON.stringify(list));

    alert("Donasi berhasil dikirim!");
}

let donasi = JSON.parse(localStorage.getItem("pawpaw_donations")) || [];

donasi.push({
    username: localStorage.getItem("username"),
    amount: Number(jumlahDonasi)
});

localStorage.setItem("pawpaw_donations", JSON.stringify(donasi));


//berita
let news = JSON.parse(localStorage.getItem("pawpaw_news")) || [];

let container = document.getElementById("berita-list");
container.innerHTML = "";

news.forEach(n => {
    container.innerHTML += `
        <div class="berita-card">
            <h3>${n.title}</h3>
            <a href="${n.url}" target="_blank">Baca Selengkapnya</a>
        </div>
    `;
});

//manajemen akun
function login() {
    let users = JSON.parse(localStorage.getItem("pawpaw_users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert("Akun tidak ditemukan");
        return;
    }

    if (user.status === "Diblokir") {
        alert("Akun Anda telah diblokir oleh admin");
        return;
    }

    // lanjut login
    alert("Login berhasil");
}

