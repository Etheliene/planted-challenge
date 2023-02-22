'use client';

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@nextui-org/react";
import Logo from "../Logo";

const PlantedNav = () => {
    const path = usePathname();
    const checkActiveRoute = (route:string):boolean => path === route;
    return (
        <Navbar isBordered variant="floating">
            <Navbar.Brand>
                <Logo />
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link href="/" isActive={checkActiveRoute('/')}>Example</Navbar.Link>
            </Navbar.Content>
        </Navbar>
    )
}

export default PlantedNav