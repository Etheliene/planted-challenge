'use client';

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
import Logo from "../Logo";

const PlantedNav = () => {
    const path = usePathname();
    const checkActiveRoute = (route:string) => path?.includes(route);
    
    return (
        <Navbar isBordered variant="floating">
            <Navbar.Brand>
                <Logo />
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link href="/" isActive={checkActiveRoute('/')}>Example without API</Navbar.Link>
                <Navbar.Link href="/algolia-example" isActive={checkActiveRoute('algolia-example')}>Example with API</Navbar.Link>
                <Navbar.Link href="/documentation" isActive={checkActiveRoute('documentation')}>Documentation</Navbar.Link>
            </Navbar.Content>
        </Navbar>
    )
}

export default PlantedNav