document.addEventListener("DOMContentLoaded", function () {
  const menuOpen = document.getElementById("menuOpen");
  const menuClose = document.getElementById("menuClose");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("show");
    sideMenu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("show");
    sideMenu.setAttribute("aria-hidden", "true");
  }

  menuOpen.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const orderButtons = document.querySelectorAll(".past-order-summary");

  function closeAllOrders() {
    orderButtons.forEach((button) => {
      const targetId = button.id.replace("-button", "-orders");
      const panel = document.getElementById(targetId);

      button.classList.remove("open");

      if (panel) {
        panel.hidden = true;
      }
    });
  }

  function toggleOrder(event) {
    const button = event.currentTarget;

    const targetId = button.id.replace("-button", "-orders");
    const panel = document.getElementById(targetId);

    if (!panel) return;

    const isOpen = button.classList.contains("open");

    closeAllOrders();

    if (!isOpen) {
      button.classList.add("open");
      panel.hidden = false;
    }
  }

  orderButtons.forEach((button) => {
    button.addEventListener("click", toggleOrder);
  });
});

function autocomplete(inp, arr) {
  let currentFocus;

  inp.addEventListener("input", function () {
    let listContainer,
      item,
      i,
      val = this.value;

    closeAllLists();
    if (!val) return false;

    currentFocus = -1;

    listContainer = document.createElement("DIV");
    listContainer.setAttribute("id", this.id + "-autocomplete-list");
    listContainer.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(listContainer);
for (i = 0; i < arr.length; i++) {
  let currentItem = arr[i]; // ✅ FIX 1

  if (currentItem.name.toUpperCase().includes(val.toUpperCase())) {
    item = document.createElement("DIV");

    // highlight match
    const matchIndex = currentItem.name.toUpperCase().indexOf(val.toUpperCase());

    const beforeMatch = currentItem.name.substring(0, matchIndex);
    const matchText = currentItem.name.substring(matchIndex, matchIndex + val.length);
    const afterMatch = currentItem.name.substring(matchIndex + val.length);

    item.innerHTML = beforeMatch + "<strong>" + matchText + "</strong>" + afterMatch;

    item.innerHTML += "<input type='hidden' value='" + currentItem.name + "'>";

    // ✅ FIX 2: lock values properly (VERY IMPORTANT)
    item.addEventListener(
      "click",
      (function (itemData) {
        return function () {
          if (itemData.link) {
            window.location.href = itemData.link;
          } else {
            inp.value = itemData.name;
            closeAllLists();
          }
        };
      })(currentItem),
    );

    listContainer.appendChild(item);
  }
}

    if (listContainer.childElementCount === 0) {
      const noItem = document.createElement("DIV");
      noItem.innerHTML = "No results found";
      noItem.style.color = "#888"; // optional styling
      noItem.style.cursor = "default";
      listContainer.appendChild(noItem);
    }
  });

  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "-autocomplete-list");
    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode === 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1 && x) x[currentFocus].click();
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    const items = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < items.length; i++) {
      if (elmnt !== items[i] && elmnt !== inp) {
        items[i].parentNode.removeChild(items[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

// =========================
// AUTOCOMPLETE INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", function () {
 const searchSuggestions = [
   { name: "Wendy's" },
   { name: "Bojangles", link: "../screens/restaurantMenu.html" },
   { name: "Panda Express" },
   { name: "Chick-Fil-A" },
   { name: "Subway" },
   { name: "Halal Shack" },
 ];

  const searchInput = document.getElementById("myInput");
  if (searchInput) {
    autocomplete(searchInput, searchSuggestions);
  }
});