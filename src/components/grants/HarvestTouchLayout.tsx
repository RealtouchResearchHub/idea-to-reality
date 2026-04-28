import { ReactNode } from "react";
import HarvestTouchNavbar from "./HarvestTouchNavbar";
import HarvestTouchFooter from "./HarvestTouchFooter";

interface HarvestTouchLayoutProps {
  children: ReactNode;
}

const HarvestTouchLayout = ({ children }: HarvestTouchLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HarvestTouchNavbar />
      <main className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
      <HarvestTouchFooter />
    </div>
  );
};

export default HarvestTouchLayout;
