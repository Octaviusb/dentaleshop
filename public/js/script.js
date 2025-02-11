document.addEventListener("DOMContentLoaded", function () {
    // Cambiamos el selector para que coincida con tu HTML
    const icons = document.querySelectorAll("i.user-icon"); // Cambiado de ".user-icon i" a "i.user-icon"
    const popups = document.querySelectorAll(".popup");

    function mostrarPopup(icon) {
        cerrarPopups();

        const popupId = icon.dataset.popup;
        const popup = document.getElementById(popupId);

        if (popup) {
            popup.classList.add("active");

            // Posicionamiento mejorado
            const iconRect = icon.getBoundingClientRect();
            const popupRect = popup.getBoundingClientRect();
            
            let left = iconRect.left + window.scrollX;
            let top = iconRect.bottom + window.scrollY + 5;

            // Evitar que el popup se salga de la ventana
            if (left + popupRect.width > window.innerWidth) {
                left = window.innerWidth - popupRect.width - 10;
            }

            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
        }
    }

    function ocultarPopup(popup) {
        setTimeout(() => {
            if (!popup.matches(":hover") && !document.querySelector("i.user-icon:hover")) {
                popup.classList.remove("active");
            }
        }, 300);
    }

    function cerrarPopups() {
        popups.forEach(popup => popup.classList.remove("active"));
    }

    icons.forEach(icon => {
        icon.addEventListener("mouseenter", function() {
            mostrarPopup(this);
        });
    });

    popups.forEach(popup => {
        popup.addEventListener("mouseleave", function() {
            ocultarPopup(this);
        });
    });

    document.addEventListener("click", function(event) {
        if (!event.target.closest(".user-icon") && !event.target.closest(".popup")) {
            cerrarPopups();
        }
    });
});