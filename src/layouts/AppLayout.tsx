import { ReactNode } from "react";
import NavBar from "../Common/DashboardComponents/NavBar";
import Sidebar from "../Common/DashboardComponents/Sidebar";

type AppLayoutProps = {
  header?: ReactNode;
  children: ReactNode;
  showSettings?: boolean;
  onSettingsClick?: () => void;
};

export default function AppLayout({
  header,
  children,
  showSettings = false,
  onSettingsClick,
}: AppLayoutProps) {
  return (
    <div className="app-shell">

      {/* Global Navbar */}
      <NavBar
        showSettings={showSettings}
        onSettingsClick={onSettingsClick}
      />

      {/* Body with Sidebar */}
      <div className="app-body">

        {/* Sidebar */}
        <Sidebar />

        {/* Right Content */}
        <div className="app-content">

          {/* Page level sticky header */}
          {header && (
            <header className="page-header">
              {header}
            </header>
          )}

          {/* Main page content */}
          <main className="page-main">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}