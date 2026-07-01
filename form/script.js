const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.sidebar-toggle');
const overlay = document.querySelector('.sidebar-overlay');
const sidebarLinks = sidebar ? Array.from(sidebar.querySelectorAll('a')) : [];
const sectionIds = ['home', 'water', 'food', 'medication', 'hobbies', 'submit'];

const closeSidebar = () => {
    if (!sidebar) {
        return;
    }

    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
    if (toggleButton) {
        toggleButton.setAttribute('aria-expanded', 'false');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
};

const updateSidebarStatus = () => {
    sidebarLinks.forEach((link) => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        const section = targetId ? document.getElementById(targetId) : null;
        const dot = link.querySelector('.nav-dot');

        if (!section || !dot) {
            return;
        }

        const inputs = section.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        const hasSelection = Array.from(inputs).some((input) => input.checked);
        dot.classList.toggle('complete', hasSelection);
    });
};

if (sidebar && toggleButton) {
    toggleButton.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open', isOpen);
        toggleButton.setAttribute('aria-expanded', String(isOpen));
        if (overlay) {
            overlay.classList.toggle('active', isOpen);
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
}

document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', updateSidebarStatus);
});

const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 140;

    let currentSection = 'home';

    sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && scrollPosition >= section.offsetTop) {
            currentSection = id;
        }
    });

    sidebarLinks.forEach((link) => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        link.classList.toggle('active', targetId === currentSection);
    });
};

sidebarLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        const targetSection = targetId ? document.getElementById(targetId) : null;

        if (!targetSection) {
            return;
        }

        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (window.innerWidth <= 800) {
            closeSidebar();
        }
    });
});

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('load', updateActiveSection);

updateSidebarStatus();
updateActiveSection();
