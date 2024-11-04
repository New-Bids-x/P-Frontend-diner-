// context/NavbarContext.js
import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
    const [isNavbarVisible, setNavbarVisible] = useState(false);

    const showNavbar = () => setNavbarVisible(true);
    const hideNavbar = () => setNavbarVisible(false);

    return (
        <NavbarContext.Provider value={{ isNavbarVisible, showNavbar, hideNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbar() {
    return useContext(NavbarContext);
}
