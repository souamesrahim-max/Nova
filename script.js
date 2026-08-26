"use strict";

/* =====================================================
   NOVA AFFAIRES — MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   CONFIGURATION
===================================================== */

const CONFIG = {

    shopName: "NOVA AFFAIRES",

    /*
       ⚠️ ضع رقم WhatsApp الحقيقي للشركة هنا
       بدون + وبدون 0 في البداية

       مثال:
       213551234567
    */

    whatsapp: "213561041907",

    currency: "DA"

};


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,
        name: "Premium Smart Watch",
        category: "إلكترونيات",
        price: 12900,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        badge: "جديد",
        description:
            "ساعة ذكية أنيقة بتصميم عصري مناسبة للاستعمال اليومي."
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "إلكترونيات",
        price: 15900,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
        badge: "HOT",
        description:
            "سماعات لاسلكية بجودة صوت ممتازة وتصميم راقٍ."
    },

    {
        id: 3,
        name: "Premium Sneakers",
        category: "أزياء",
        price: 18500,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
        badge: "مميز",
        description:
            "حذاء رياضي مريح بتصميم عصري مناسب للإطلالات اليومية."
    },

    {
        id: 4,
        name: "Urban Jacket",
        category: "أزياء",
        price: 21900,
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
        badge: "جديد",
        description:
            "جاكيت أنيق بجودة ممتازة وإطلالة عصرية."
    },

    {
        id: 5,
        name: "Luxury Backpack",
        category: "إكسسوارات",
        price: 8900,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
        badge: "الأكثر مبيعاً",
        description:
            "حقيبة عملية وأنيقة للعمل والسفر والدراسة."
    },

    {
        id: 6,
        name: "Modern Sunglasses",
        category: "إكسسوارات",
        price: 6900,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
        badge: "جديد",
        description:
            "نظارات شمسية عصرية بإطلالة فاخرة."
    },

    {
        id: 7,
        name: "Minimal Wallet",
        category: "إكسسوارات",
        price: 4900,
        image:
            "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
        badge: "",
        description:
            "محفظة عملية بتصميم Minimal أنيق."
    },

    {
        id: 8,
        name: "Portable Speaker",
        category: "إلكترونيات",
        price: 9900,
        image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
        badge: "HOT",
        description:
            "مكبر صوت محمول بصوت قوي وحجم عملي."
    }

];


/* =====================================================
   STATE
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("nova-cart") || "[]"
    );

let favorites =
    JSON.parse(
        localStorage.getItem("nova-favorites") || "[]"
    );

let currentFilter = "all";


/* =====================================================
   HELPERS
===================================================== */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    document.querySelectorAll(selector);


function formatPrice(value) {

    return (
        Number(value)
            .toLocaleString("fr-FR")
        + " "
        + CONFIG.currency
    );

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   INIT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initLoader();

        renderProducts();

        renderCart();

        updateCartCount();

        initHeader();

        initSearch();

        initMobileMenu();

        initTheme();

        initFilters();

        initTracking();

        initCart();

        initCheckout();

        initContact();

        initKeyboard();

    }
);


/* =====================================================
   LOADER
===================================================== */

function initLoader() {

    const loader = $(".loader");

    if (!loader) return;

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () =>
                    loader.classList.add("hidden"),
                500
            );

        }
    );

}


/* =====================================================
   HEADER
===================================================== */

function initHeader() {

    const header = $(".header");

    if (!header) return;

    function checkScroll() {

        if (window.scrollY > 20)
            header.classList.add("scrolled");
        else
            header.classList.remove("scrolled");

    }

    checkScroll();

    window.addEventListener(
        "scroll",
        checkScroll,
        { passive: true }
    );

}


/* =====================================================
   SEARCH
===================================================== */

function initSearch() {

    const button = $(".search-button");
    const bar = $(".search-bar");
    const close = $(".close-search");
    const input = $(".search-input");

    if (!button || !bar) return;

    button.addEventListener(
        "click",
        () => {

            bar.classList.toggle("open");

            if (
                bar.classList.contains("open") &&
                input
            ) {

                setTimeout(
                    () => input.focus(),
                    200
                );

            }

        }
    );

    if (close) {

        close.addEventListener(
            "click",
            () =>
                bar.classList.remove("open")
        );

    }

    if (input) {

        input.addEventListener(
            "input",
            () => {

                renderProducts(
                    currentFilter,
                    input.value
                );

            }
        );

    }

}


/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu() {

    const menuButton = $(".menu-btn");
    const menu = $(".mobile-menu");
    const close = $(".close-mobile-menu");
    const overlay = $(".overlay");

    if (!menuButton || !menu) return;

    menuButton.addEventListener(
        "click",
        () => {

            menu.classList.add("open");

            overlay?.classList.add("show");

        }
    );

    close?.addEventListener(
        "click",
        closeMobileMenu
    );

    overlay?.addEventListener(
        "click",
        () => {

            closeMobileMenu();
            closeCart();

        }
    );

    $$(".mobile-menu a").forEach(
        link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        }
    );

}


function closeMobileMenu() {

    $(".mobile-menu")
        ?.classList.remove("open");

    if (
        !$(".cart-drawer")
            ?.classList.contains("open")
    ) {

        $(".overlay")
            ?.classList.remove("show");

    }

}


/* =====================================================
   THEME
===================================================== */

function initTheme() {

    const button = $(".theme-toggle");

    if (!button) return;

    const saved =
        localStorage.getItem("nova-theme");

    if (saved === "dark") {

        document.body.classList.add("dark");

    }

    updateThemeIcon();

    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "nova-theme",
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light"
            );

            updateThemeIcon();

        }
    );

}


function updateThemeIcon() {

    const button = $(".theme-toggle");

    if (!button) return;

    button.textContent =
        document.body.classList.contains("dark")
            ? "☀"
            : "☾";

}


/* =====================================================
   FILTERS
===================================================== */

function initFilters() {

    $$(".filter").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    $$(".filter").forEach(
                        item =>
                            item.classList.remove("active")
                    );

                    button.classList.add("active");

                    currentFilter =
                        button.dataset.filter ||
                        "all";

                    const search =
                        $(".search-input")?.value ||
                        "";

                    renderProducts(
                        currentFilter,
                        search
                    );

                }
            );

        }
    );

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts(
    filter = "all",
    search = ""
) {

    const grid = $(".products-grid");

    if (!grid) return;

    const query =
        search.trim().toLowerCase();

    const result =
        products.filter(
            product => {

                const categoryMatch =
                    filter === "all" ||
                    product.category === filter;

                const searchMatch =
                    !query ||
                    product.name
                        .toLowerCase()
                        .includes(query) ||
                    product.category
                        .toLowerCase()
                        .includes(query);

                return (
                    categoryMatch &&
                    searchMatch
                );

            }
        );


    grid.innerHTML = "";


    result.forEach(
        product => {

            const favorite =
                favorites.includes(product.id);


            const card =
                document.createElement("article");

            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                    >

                    ${
                        product.badge
                        ?
                        `
                        <span class="product-badge">
                            ${escapeHTML(product.badge)}
                        </span>
                        `
                        :
                        ""
                    }

                    <button
                        class="product-wishlist"
                        data-action="favorite"
                        data-id="${product.id}"
                    >
                        ${favorite ? "♥" : "♡"}
                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${escapeHTML(product.category)}
                    </span>

                    <h3 class="product-name">
                        ${escapeHTML(product.name)}
                    </h3>

                    <div class="product-bottom">

                        <strong class="product-price">
                            ${formatPrice(product.price)}
                        </strong>

                        <button
                            class="add-cart"
                            data-action="add"
                            data-id="${product.id}"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;


            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            "[data-action]"
                        )
                    ) return;

                    openProductModal(
                        product.id
                    );

                }
            );


            grid.appendChild(card);

        }
    );


    const empty =
        $(".empty-products");

    if (empty) {

        empty.classList.toggle(
            "show",
            result.length === 0
        );

    }

}


/* =====================================================
   PRODUCT ACTIONS
===================================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-action]"
            );

        if (!button) return;

        const action =
            button.dataset.action;

        const id =
            Number(button.dataset.id);


        if (action === "add")
            addToCart(id);


        if (action === "favorite")
            toggleFavorite(id);


        if (action === "remove")
            removeFromCart(id);


        if (action === "increase")
            changeQuantity(id, 1);


        if (action === "decrease")
            changeQuantity(id, -1);

    }
);


/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                item => item !== id
            );

        showToast(
            "تم حذف المنتج من المفضلة"
        );

    } else {

        favorites.push(id);

        showToast(
            "تمت إضافة المنتج للمفضلة ♥"
        );

    }


    localStorage.setItem(
        "nova-favorites",
        JSON.stringify(favorites)
    );


    const search =
        $(".search-input")?.value || "";

    renderProducts(
        currentFilter,
        search
    );

}


/* =====================================================
   CART
===================================================== */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    updateCartCount();

    showToast(
        "تمت إضافة المنتج إلى السلة 🛒"
    );

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveCart();

    renderCart();

    updateCartCount();

    showToast(
        "تم حذف المنتج"
    );

}


function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );

    if (!item) return;

    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    renderCart();

    updateCartCount();

}


function saveCart() {

    localStorage.setItem(
        "nova-cart",
        JSON.stringify(cart)
    );

}


function getCartCount() {

    return cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product)
                return total;

            return total +
                product.price *
                item.quantity;

        },
        0
    );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const container =
        $(".cart-items");

    if (!container) return;


    if (!cart.length) {

        container.innerHTML = `

            <div class="cart-empty">

                <div>

                    <div style="font-size:45px">
                        🛒
                    </div>

                    <p>
                        السلة فارغة
                    </p>

                </div>

            </div>

        `;

        updateCartTotal();

        return;

    }


    container.innerHTML = "";


    cart.forEach(
        item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product) return;


            const element =
                document.createElement("div");

            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                    >

                </div>


                <div>

                    <div class="cart-item-name">
                        ${escapeHTML(product.name)}
                    </div>

                    <div class="cart-item-price">
                        ${formatPrice(
                            product.price *
                            item.quantity
                        )}
                    </div>

                    <div class="quantity-control">

                        <button
                            data-action="decrease"
                            data-id="${product.id}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            data-action="increase"
                            data-id="${product.id}"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove-item"
                    data-action="remove"
                    data-id="${product.id}"
                >
                    ×
                </button>

            `;


            container.appendChild(element);

        }
    );


    updateCartTotal();

}


function updateCartTotal() {

    const total =
        formatPrice(
            getCartTotal()
        );

    $$(".cart-total").forEach(
        element =>
            element.textContent = total
    );

}


/* =====================================================
   CART OPEN/CLOSE
===================================================== */

function initCart() {

    $(".cart-btn")
        ?.addEventListener(
            "click",
            openCart
        );

    $(".close-cart")
        ?.addEventListener(
            "click",
            closeCart
        );

    $(".continue-shopping")
        ?.addEventListener(
            "click",
            closeCart
        );

}


function openCart() {

    $(".cart-drawer")
        ?.classList.add("open");

    $(".overlay")
        ?.classList.add("show");

}


function closeCart() {

    $(".cart-drawer")
        ?.classList.remove("open");

    if (
        !$(".mobile-menu")
            ?.classList.contains("open")
    ) {

        $(".overlay")
            ?.classList.remove("show");

    }

}


function updateCartCount() {

    const count =
        getCartCount();

    $$(".cart-count").forEach(
        element =>
            element.textContent = count
    );

}


/* =====================================================
   CHECKOUT
===================================================== */

function initCheckout() {

    $(".checkout-button")
        ?.addEventListener(
            "click",
            openCheckout
        );

    $(".close-checkout")
        ?.addEventListener(
            "click",
            closeCheckout
        );

    $(".checkout-form")
        ?.addEventListener(
            "submit",
            submitCheckout
        );

}


function openCheckout() {

    if (!cart.length) {

        showToast(
            "السلة فارغة"
        );

        return;

    }

    closeCart();

    const modal =
        $(".checkout-modal");

    modal?.classList.add("show");

    updateCheckoutTotal();

}


function closeCheckout() {

    $(".checkout-modal")
        ?.classList.remove("show");

}


function updateCheckoutTotal() {

    const total =
        formatPrice(
            getCartTotal()
        );

    $$(".checkout-total-value")
        .forEach(
            element =>
                element.textContent = total
        );

}


function submitCheckout(event) {

    event.preventDefault();


    if (!cart.length) {

        showToast(
            "السلة فارغة"
        );

        return;

    }


    const form =
        event.currentTarget;

    const data =
        new FormData(form);


    const name =
        data.get("name");

    const phone =
        data.get("phone");

    const city =
        data.get("city");

    const address =
        data.get("address");


    const orderId =
        createOrderId();


    let message =
        `*طلب جديد - ${CONFIG.shopName}*%0A%0A`;


    message +=
        `رقم الطلب: ${orderId}%0A`;

    message +=
        `الاسم: ${encodeURIComponent(name)}%0A`;

    message +=
        `الهاتف: ${encodeURIComponent(phone)}%0A`;

    message +=
        `الولاية: ${encodeURIComponent(city)}%0A`;

    message +=
        `العنوان: ${encodeURIComponent(address)}%0A%0A`;


    message +=
        `*المنتجات:*%0A`;


    cart.forEach(
        item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product) return;


            message +=
                `• ${encodeURIComponent(
                    product.name
                )} × ${item.quantity}%0A`;

        }
    );


    message +=
        `%0A*الإجمالي:* ${encodeURIComponent(
            formatPrice(
                getCartTotal()
            )
        )}`;


    saveLastOrder(orderId);

    openWhatsApp(message);


    cart = [];

    saveCart();

    renderCart();

    updateCartCount();

    form.reset();

    showToast(
        `تم تجهيز الطلب #${orderId}`
    );


    setTimeout(
        closeCheckout,
        700
    );

}


/* =====================================================
   ORDER ID
===================================================== */

function createOrderId() {

    const number =
        Math.floor(
            1000 +
            Math.random() * 9000
        );

    return `DZ${number}`;

}


function saveLastOrder(id) {

    localStorage.setItem(
        "nova-last-order",
        id
    );

}


/* =====================================================
   WHATSAPP
===================================================== */

function openWhatsApp(message) {

    const url =
        `https://wa.me/${CONFIG.whatsapp}?text=${message}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
   TRACKING
===================================================== */

const demoOrders = {

    DZ1001: {
        status: "قيد المعالجة",
        date: "26 أغسطس 2026",
        city: "الجزائر",
        step: 1
    },

    DZ1002: {
        status: "تم الشحن",
        date: "25 أغسطس 2026",
        city: "قسنطينة",
        step: 2
    },

    DZ1003: {
        status: "في الطريق",
        date: "24 أغسطس 2026",
        city: "سطيف",
        step: 3
    },

    DZ1004: {
        status: "تم التوصيل",
        date: "23 أغسطس 2026",
        city: "وهران",
        step: 4
    }

};


function initTracking() {

    const form =
        $(".tracking-form");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                $(".tracking-input");


            const id =
                input.value
                    .trim()
                    .toUpperCase();


            trackOrder(id);

        }
    );

}


function trackOrder(id) {

    const result =
        $(".tracking-result");

    const notFound =
        $(".tracking-not-found");


    if (!id) {

        showToast(
            "أدخل رقم الطلب"
        );

        return;

    }


    const order =
        demoOrders[id];


    if (!order) {

        result?.classList.remove("show");

        notFound?.classList.add("show");

        return;

    }


    notFound?.classList.remove("show");

    result?.classList.add("show");


    $(".tracking-order-id")
        .textContent = id;

    $(".tracking-status-text")
        .textContent = order.status;

    $(".tracking-date")
        .textContent = order.date;

    $(".tracking-city")
        .textContent = order.city;


    updateTrackingSteps(
        order.step
    );

}


function updateTrackingSteps(step) {

    const steps =
        $$(".tracking-step");

    const lines =
        $$(".tracking-line");


    steps.forEach(
        (element, index) => {

            element.classList.toggle(
                "active",
                index < step
            );

        }
    );


    lines.forEach(
        (line, index) => {

            line.style.background =
                index < step - 1
                    ? "var(--pink)"
                    : "";

        }
    );

}


/* =====================================================
   CONTACT
===================================================== */

function initContact() {

    const form =
        $(".contact-form");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const data =
                new FormData(form);


            const name =
                data.get("name");

            const phone =
                data.get("phone");

            const message =
                data.get("message");


            const text =
                `*رسالة من موقع ${CONFIG.shopName}*%0A%0A` +
                `الاسم: ${encodeURIComponent(name)}%0A` +
                `الهاتف: ${encodeURIComponent(phone)}%0A` +
                `الرسالة: ${encodeURIComponent(message)}`;


            openWhatsApp(text);


            showToast(
                "تم تجهيز الرسالة عبر WhatsApp"
            );


            form.reset();

        }
    );

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProductModal(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;


    const modal =
        $(".product-modal");

    if (!modal) return;


    const image =
        $(".product-modal-image img");

    const category =
        $(".product-modal-category");

    const name =
        $(".product-modal-name");

    const description =
        $(".product-modal-description");

    const price =
        $(".product-modal-price");

    const add =
        $(".product-modal-add");


    image.src =
        product.image;

    image.alt =
        product.name;


    category.textContent =
        product.category;

    name.textContent =
        product.name;

    description.textContent =
        product.description;

    price.textContent =
        formatPrice(product.price);


    add.onclick =
        () => {

            addToCart(product.id);

            closeProductModal();

        };


    modal.classList.add("show");


    $(".product-modal .modal-close")
        ?.addEventListener(
            "click",
            closeProductModal,
            { once: true }
        );

}


function closeProductModal() {

    $(".product-modal")
        ?.classList.remove("show");

}


/* =====================================================
   MODAL OUTSIDE CLICK
===================================================== */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   TOAST
===================================================== */

let toastTimeout;


function showToast(message) {

    const toast =
        $(".toast");

    if (!toast) return;


    toast.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}


/* =====================================================
   KEYBOARD
===================================================== */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeCart();

                closeMobileMenu();

                closeCheckout();

                closeProductModal();

            }

        }
    );

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


if (sections.length) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        )
                            return;


                        navLinks.forEach(
                            link =>
                                link.classList.remove(
                                    "active"
                                )
                        );


                        const active =
                            document.querySelector(
                                `.nav-link[href="#${entry.target.id}"]`
                            );


                        active?.classList.add(
                            "active"
                        );

                    }
                );

            },
            {
                threshold: .3
            }
        );


    sections.forEach(
        section =>
            observer.observe(section)
    );

}


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%cNOVA AFFAIRES",
    "font-size:22px;font-weight:900;"
);

console.log(
    "Demo tracking:",
    "DZ1001 / DZ1002 / DZ1003 / DZ1004"
);