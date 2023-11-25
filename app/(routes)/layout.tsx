import MainLayout from "@src/components/Main/MainLayout";
import "./globals.css";

interface RootLayoutProps extends React.PropsWithChildren {}

export const metadata = {
  title: "Life As RPG",
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
};

export default RootLayout;
