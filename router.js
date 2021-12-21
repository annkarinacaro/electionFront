import renderMain from "./pages/main/main.js";

const router = new Navigo("/", { hash: true });

router
    .on({
        "/": () => {
            renderMain();
            router.updatePageLinks();
        },
    })
    .resolve();
