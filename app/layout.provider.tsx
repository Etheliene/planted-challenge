'use client'
import { createTheme, NextUIProvider } from '@nextui-org/react'

const theme = createTheme({
    type: "dark",
    theme: {
        colors: {
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
