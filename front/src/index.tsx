import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <RecoilRoot>
        <React.Suspense fallback={<h1>loading...</h1>}>
            <App />
        </React.Suspense>
    </RecoilRoot>
);
