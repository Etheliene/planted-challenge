import './globals.css'
import Provider from './layout.provider';

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }:RootLayoutProps) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
