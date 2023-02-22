'use client'
import { createTheme, NextUIProvider } from '@nextui-org/react'

const theme = createTheme({
    type: "dark",
    theme: {
        colors: {
            primary: '#4ADE7B',
            secondary: '#F9CB80',
            error: '#FCC5D8',
        },
    }
})


export default function Provider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <NextUIProvider theme={theme}>
            {children}
        </NextUIProvider>
    )
}
