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
  let currentItem = arr[i];

  if (currentItem.name.toUpperCase().includes(val.toUpperCase())) {
    item = document.createElement("DIV");

    // highlight match
    const matchIndex = currentItem.name.toUpperCase().indexOf(val.toUpperCase());

    const beforeMatch = currentItem.name.substring(0, matchIndex);
    const matchText = currentItem.name.substring(matchIndex, matchIndex + val.length);
    const afterMatch = currentItem.name.substring(matchIndex + val.length);

    item.innerHTML = beforeMatch + "<strong>" + matchText + "</strong>" + afterMatch;

    item.innerHTML += "<input type='hidden' value='" + currentItem.name + "'>";

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
   { name: "Wendy's", link: "../screens/wendys/restaurantMenu.html" },
   { name: "Bojangles", link: "../screens/bojangles/restaurantMenu.html" },
   { name: "Panda Express", link: "../screens/panda/restaurantMenu.html"},
   { name: "Chick-Fil-A", link: "../screens/chickfila/restaurantMenu.html"},
   { name: "Subway", link: "../screens/subway/restaurantMenu.html" },
   { name: "Halal Shack", link: "../screens/halal/restaurantMenu.html" },
 ];

  const searchInput = document.getElementById("myInput");
  if (searchInput) {
    autocomplete(searchInput, searchSuggestions);
  }
});

/* FORM JS */
document.addEventListener("DOMContentLoaded", function() {
    const cardForm = document.getElementById("cardForm");
    if (!cardForm) return;

    const cardName = document.getElementById("cardName");
    const cardNumber = document.getElementById("cardNumber");
    const expirationDate = document.getElementById("expirationDate");
    const cvc = document.getElementById("cvc");
    const formStatus = document.getElementById("formStatus");

    function setFieldState(input, messageElement, message, isValid) {
        messageElement.textContent = message;
        input.classList.remove("input-error", "input-success");
        messageElement.classList.remove("error-text", "success-text");

        if (isValid) {
            input.classList.add("input-success");
            messageElement.classList.add("success-text");
        } else {
            input.classList.add("input-error");
            messageElement.classList.add("error-text");
        }
    }

    function clearFieldState(input, messageElement) {
        input.classList.remove("input-error", "input-success");
        messageElement.classList.remove("error-text", "success-text");
        messageElement.textContent = "";
    }

    function validateCardName() {
        const value = cardName.value.trim();
        const messageElement = document.getElementById("cardNameMessage");

        if (value === "") {
            setFieldState(cardName, messageElement, "Please enter the full name shown on the card.", false);
            return false;
        }

        if (value.length < 2) {
            setFieldState(cardName, messageElement, "Name must be at least 2 characters long.", false);
            return false;
        }

        if (!/^[A-Za-z\s.'-]+$/.test(value)) {
            setFieldState(cardName, messageElement, "Use only letters for the cardholder name.", false);
            return false;
        }

        setFieldState(cardName, messageElement, "Name looks good.", true);
        return true;
    }

    function formatCardNumber(value) {
        return value.replace(/\D/g, "").slice(0,16).replace(/(.{4})/g, "$1 ").trim();
    }

    function validateCardNumber() {
        const messageElement = document.getElementById("cardNumberMessage");
        const digitsOnly = cardNumber.value.replace(/\D/g, "");

        if (digitsOnly === "") {
            setFieldState(cardNumber, messageElement, "Please enter your card number.", false);
            return false;
        }

        if (digitsOnly.length < 16) {
            setFieldState(cardNumber, messageElement, "Card number must be 16 digits.", false);
            return false;
        }

        setFieldState(cardNumber, messageElement, "Card number format looks correct.", true);
        return true;
    }

    function formatExpirationDate(value) {
        const digitsOnly = value.replace(/\D/g, "").slice(0, 4);

        if (digitsOnly.length <= 2) {
            return digitsOnly;
        }

        return digitsOnly.slice(0, 2) + " / " + digitsOnly.slice(2);
    }

    function validateExpirationDate() {
        const value = expirationDate.value.trim();
        const messageElement = document.getElementById("expirationDateMessage");
        const match = value.match(/^(\d{2})\s\/\s(\d{2})$/);

        if (value === "") {
            setFieldState(expirationDate, messageElement, "Please enter the expiration date in MM / YY format.", false);
            return false;
        }

        if (!match) {
            setFieldState(expirationDate, messageElement, "Use MM / YY format, for example 08 / 27.", false);
            return false;
        }

        const month = parseInt(match[1], 10);

        if (month < 1 || month > 12) {
            setFieldState(expirationDate, messageElement, "Month must be between 01 and 12.", false);
            return false;
        }

        setFieldState(expirationDate, messageElement, "Expiration date format looks good.", true);
        return true;
    }

    function validateCVC() {
        const value = cvc.value.replace(/\D/g, "");
        const messageElement = document.getElementById("cvcMessage");

        if (value === "") {
            setFieldState(cvc, messageElement, "Please enter the card security code.", false);
            return false;
        }

        if (value.length < 3 || value.length > 4) {
            setFieldState(cvc, messageElement, "CVC must be 3 or 4 digits.", false);
            return false;
        }

        setFieldState(cvc, messageElement, "CVC looks good.", true);
        return true;
    }

    cardName.addEventListener("input", validateCardName);
    cardName.addEventListener("blur", validateCardName);

    cardNumber.addEventListener("input", function () {
        cardNumber.value = formatCardNumber(cardNumber.value);
        validateCardNumber();
    });

    cardNumber.addEventListener("blur", validateCardNumber);

    expirationDate.addEventListener("input", function () {
        expirationDate.value = formatExpirationDate(expirationDate.value);
        validateExpirationDate();
    });

    expirationDate.addEventListener("blur", validateExpirationDate);

    cvc.addEventListener("input", function () {
        cvc.value = cvc.value.replace(/\D/g, "").slice(0, 4);
        validateCVC();
    });

    cvc.addEventListener("blur", validateCVC);

    cardForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isNameValid = validateCardName();
        const isCardNumberValid = validateCardNumber();
        const isExpirationValid = validateExpirationDate();
        const isCvcValid = validateCVC();

        if (isNameValid && isCardNumberValid && isExpirationValid && isCvcValid) {
            formStatus.textContent = "Card saved successfully.";
            formStatus.classList.add("success-text");
            formStatus.classList.remove("error-text");
            
            setTimeout(function() {
                window.location.href = "./ConfirmationCard.html";
            }, 500);
        } else {
            formStatus.textContent = "Please correct the highlighted fields before saving your card.";
            formStatus.classList.add("error-text");
            formStatus.classList.remove("success-text");
        }
    });
});