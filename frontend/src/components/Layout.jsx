// src/components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="max-w-[1200px] mx-auto p-4">
            {children}
        </div>
    );
};

export default Layout;
