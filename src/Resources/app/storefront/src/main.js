document.addEventListener('DOMContentLoaded', () => {



    const toggle = document.querySelector('.listing-filter-toggle');
    const sidebarFilter = document.querySelector('.cms-section-sidebar .cms-element-sidebar-filter');

    if (toggle && sidebarFilter) {
        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            sidebarFilter.classList.add('is-open');
        });

        document.addEventListener('click', (event) => {
            const closeBtn = event.target.closest('.js-offcanvas-close');
            if (!closeBtn) {
                return;
            }

            sidebarFilter.classList.remove('is-open');
        });
    }

    const navLinks = document.querySelectorAll('.main-navigation-menu .nav-item.dropdown > .main-navigation-link');
    let lastLink = null;

    const positionFlyout = (link) => {
        const dropdown = link.closest('.nav-item.dropdown');
        if (!dropdown) {
            return;
        }

        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) {
            return;
        }

        const categories = menu.querySelector('.navigation-flyout-categories.is-level-0');
        if (!categories) {
            return;
        }

        const menuRect = menu.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const categoriesWidth = categories.offsetWidth;

        if (categoriesWidth === 0 || menuRect.width === 0) {
            return;
        }

        const linkCenter = linkRect.left + (linkRect.width / 2);
        let leftOffset = linkCenter - menuRect.left - (categoriesWidth / 2);
        const maxOffset = Math.max(0, menuRect.width - categoriesWidth);

        if (leftOffset < 0) leftOffset = 0;
        if (leftOffset > maxOffset) leftOffset = maxOffset;

        categories.style.marginLeft = `${Math.round(leftOffset)}px`;
        categories.style.marginRight = 'auto';
    };

    const handleEnter = (event) => {
        const link = event.currentTarget;
        lastLink = link;
        window.requestAnimationFrame(() => positionFlyout(link));
    };

    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', handleEnter);
        link.addEventListener('focusin', handleEnter);
    });

    window.addEventListener('resize', () => {
        if (lastLink) {
            positionFlyout(lastLink);
        }
    });
});
