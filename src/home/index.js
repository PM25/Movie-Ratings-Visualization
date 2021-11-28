import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./index.css";

export default function Home() {
    return (
        <HelmetProvider>
            <div id="home">
                <Helmet>
                    <title>Movie Ratings</title>
                    <meta
                        name="description"
                        content="homepage of movie ratings"
                    />
                </Helmet>
            </div>
        </HelmetProvider>
    );
}
