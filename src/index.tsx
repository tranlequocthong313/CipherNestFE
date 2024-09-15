import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "./providers/ThemeProvider";
import "./configs/i18n.ts";
import CoverFileProvider from "./providers/CoverFileProvider";
import SecretFileProvider from "./providers/SecretFileProvider";
import EmbedProvider from "./providers/EmbedProvider";
import ExtractProvider from "./providers/ExtractProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <CoverFileProvider>
                <SecretFileProvider>
                    <ExtractProvider>
                        <EmbedProvider>
                            <App />
                        </EmbedProvider>
                    </ExtractProvider>
                </SecretFileProvider>
            </CoverFileProvider>
        </ThemeProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
