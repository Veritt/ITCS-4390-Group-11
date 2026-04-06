document.addEventListener("DOMContentLoaded", function () {
    const menuOpen = document.getElementById("menuOpen");
    const menuClose = document.getElementById("menuClose");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    
    if (!menuOpen || !menuClose || !sideMenu || !menuOverlay) {
        return;
    }
    
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