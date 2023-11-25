import "./globals.css";

interface RootLayoutProps extends React.PropsWithChildren {}

export const metadata = {
  title: "Life As RPG",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
