const API_URL = '/api';
    
function loadData() {
    fetch(`${API_URL}/info`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('store-name').innerText = data.judul_katalog;
            document.getElementById('footer-identity-text').innerText = "Site made by: " + data.pemilik + " - NIM: " + data.nim;
            const list = document.getElementById('items-list');
            list.innerHTML = '';
            let no = 1;
            data.items.forEach(item => {
                let tr = document.createElement('tr');


                let th_id = document.createElement('th');
                th_id.innerText = "#" + no;

                let th_name = document.createElement('th');
                th_name.innerText = item;

                tr.appendChild(th_id);
                tr.appendChild(th_name);
                list.appendChild(tr);

                no++;
            });
    });
}

function tambahItem() {
    const input = document.getElementById('items-input');
    fetch(`${API_URL}/add-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: input.value })
    })
    .then(res => res.json())
    .then(() => {
        input.value = '';
        loadData();
    });
}
loadData();
