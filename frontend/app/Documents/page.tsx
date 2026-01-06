import Footer from "./components/Footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";

export default function Documents() {
    return(
        <main>
            <div className='min-h-screen'>
                <div>
                    <Navbar />
                </div>
            </div>
            <Footer />
        </main>
    );
}