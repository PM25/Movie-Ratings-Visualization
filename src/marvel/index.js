import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./index.css";
import Header from "./section/header.jsx";
import RatingsSection from "./section/ratings.jsx";

export default function Marvel() {
    return (
        <HelmetProvider>
            <div id="Marvel">
                <Helmet>
                    <title>Movie Ratings - Marvel</title>
                    <meta
                        name="description"
                        content="rating of Marvel movies"
                    />
                </Helmet>

                <Header />
                <RatingsSection />
            </div>
        </HelmetProvider>
    );
}
