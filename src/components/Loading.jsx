import React from "react";
import { BlinkBlur } from 'react-loading-indicators';

export default function Loader() {
    return (
        <div
            style={{
                fontFamily: "sans-serif",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Make sure it occupies the full viewport height
                textAlign: "center"
            }}
        >
            <BlinkBlur
                color="#8031cc"
                size="medium"
                text="Loading..."
                textColor="#8031cc" // Set text color to match the loader if desired
            />
        </div>
    );
}
 