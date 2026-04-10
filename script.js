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
        orderButtons.forEach(button => {
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

    orderButtons.forEach(button => {
        button.addEventListener("click", toggleOrder);
    });
});