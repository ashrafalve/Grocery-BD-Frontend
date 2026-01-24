import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PublicLayoutProps {
    children: React.ReactNode;
    showNavbar?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, showNavbar = true }) => {
    return (
        <>
            {showNavbar && <Navbar />}
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default PublicLayout;