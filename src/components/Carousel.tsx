import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";

const Carousel: React.FC = () => {
  const pathname = usePathname();

  const routes = [
    { path: "/login", title: "Welcome!", subtitle: "Get started with signup/login." },
    { path: "/otp", title: "Verify!", subtitle: "Verify your Email/Phone." },
    { path: "/createuser", title: "Create Account!", subtitle: "Create your user account." },
    { path: "/createInstitute", title: "Create Institute!", subtitle: "Create your own institute." },
    { path: "/forgotPassword", title: "Forgot Password?", subtitle: "Reset in a few seconds." },
    { path: "/createNewPassword", title: "Recreate Password!", subtitle: "Create your new password." },
  ];

  const currentRoute = routes.find((route) => route.path === pathname);

  return (
    <div>
      {currentRoute && (
        <div className="text-center space-y-3">
          <h1>{currentRoute.title}</h1>
          <p className="text-lg opacity-60">{currentRoute.subtitle}</p>
        </div>
      )}

      <div>
        <Pagination>
          <PaginationContent className="space-x-3">
            {routes.map((route) => (
              <PaginationItem key={route.path} className="mt-5 flex items-center">
                <PaginationLink
                  href={route.path} // Use route path as href for navigation
                  className={`rounded-full ${
                    pathname === route.path ? "h-4 w-4 bg-[#115DB8]" : "h-2 w-2 bg-white"
                  }`}
                />
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Carousel;
