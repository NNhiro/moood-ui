
document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("stores");
      data.forEach(store => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${store.image}" alt="${store.name}" />
          <div class="card-content">
            <h3>${store.name}</h3>
            <p>￥￥ ${store.rating} ★ ${store.reviews}件</p>
            <p>${store.comment}</p>
          </div>
        `;
        container.appendChild(card);
      });
    });
});
