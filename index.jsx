import {createRoot} from "react-dom/client";
import Main from "./main.jsx";
import Header from "./header";
const container = document.getElementById("main");
const root = createRoot(container);
root.render(
    <>
        <Header />
        <Main />
    </>
);