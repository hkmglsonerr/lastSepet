const span = document.querySelector("#span");

let sepet = [];

let localItem = localStorage.getItem("sepet");
if (localItem) {
  sepet = JSON.parse(localItem);
  span.textContent = sepet.length;
}

if (window.location.href == "http://127.0.0.1:5500/index.html") {
  const row = document.querySelector(".row");

  urunler.forEach((urun) => {
    urun.quantity = 1;

    const col = document.createElement("div");
    col.classList.add("col-lg-3", "col-sm-6", "col-12");

    const parentDiv = document.createElement("div");
    parentDiv.style.width = "100%";
    parentDiv.style.height = "300px";
    parentDiv.style.border = "1px solid black";

    const imgDiv = document.createElement("div");
    imgDiv.style.width = "100%";
    imgDiv.style.height = "100px";

    const img = document.createElement("img");
    img.src = urun.fotoğraf;
    img.style.width = "100%";
    img.style.height = "100%";

    const cardBody = document.createElement("div");
    cardBody.style.width = "100%";
    cardBody.style.height = "120px";

    const baslik = document.createElement("h5");
    baslik.textContent = urun.isim;

    const aciklama = document.createElement("p");
    aciklama.textContent = `${urun.açıklama}-${urun.fiyat}`;

    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-dark");
    btn.textContent = "Sepete Ekle";

    btn.addEventListener("click", () => {
      sepet.push(urun);
      localStorage.setItem("sepet", JSON.stringify(sepet));
      span.textContent = sepet.length;
    });

    cardBody.append(baslik);
    cardBody.append(aciklama);
    cardBody.append(btn);

    imgDiv.append(img);

    parentDiv.append(imgDiv);
    parentDiv.append(cardBody);

    col.append(parentDiv);

    row.append(col);
  });
} else if (window.location.href == "http://127.0.0.1:5500/sepet.html") {
  const container = document.querySelector(".container");
  if (sepet.length == 0) {
    const h4 = document.createElement("h4");
    h4.textContent = "Sepetinizde ürün yok";

    container.append(h4);
  } else {
    //! sepetimin uzunluğu sıfırdan büyükse burdaki kodlar çalışacak
    sepet.forEach((urun) => {
      const div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "200px";
      div.style.border = "1px solid black";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "between";
      div.style.gap = "170px";

      const imgDiv = document.createElement("div");
      imgDiv.style.width = "25%";
      imgDiv.style.height = "100%";

      const img = document.createElement("img");
      img.src = urun.fotoğraf;
      img.style.width = "100%";
      img.style.height = "100%";

      const baslik = document.createElement("h3");
      baslik.textContent = urun.isim;

      const price = document.createElement("p");
      price.textContent = urun.fiyat + "$";
      price.style.fontWeight = "bold";

      const kacTane = document.createElement("div");
      //bir şeye ihtiyaç olursa ekleriz

      const sayi = document.createElement("p");
      sayi.textContent = urun.quantity;

      const azaltBtn = document.createElement("button");
      azaltBtn.textContent = "-";
      azaltBtn.classList.add("btn", "btn-light");

      const arttırBtn = document.createElement("button");
      arttırBtn.textContent = "+";
      arttırBtn.classList.add("btn", "btn-light");

      azaltBtn.addEventListener("click", function () {
        if (urun.quantity >= 1) {
          urun.quantity--;
          sayi.textContent = urun.quantity;
        }
        if (urun.quantity == 0) {
          this.parentElement.parentElement.remove();

          //!localstorage den silme

          let urunIndex = sepet.indexOf(urun);
          sepet.splice(urunIndex, 1);

          localStorage.setItem("sepet", JSON.stringify(sepet));
          //!localstorage den silme
        }
      });

      arttırBtn.addEventListener("click", () => {
        urun.quantity++;
        sayi.textContent = urun.quantity;
      });

      imgDiv.append(img);
      kacTane.append(azaltBtn);
      kacTane.append(sayi);
      kacTane.append(arttırBtn);

      div.append(imgDiv);
      div.append(baslik);
      div.append(price);
      div.append(kacTane);

      container.append(div);
    });
  }
}
// localStorage.clear();
