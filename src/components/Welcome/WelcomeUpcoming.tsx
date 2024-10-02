import React from "react";
import upcomingFeatures from "@/components/Welcome/UpcomingFeatures.json";
import {
  BarChartBig,
  Bell,
  Globe,
  Presentation,
  School,
  TabletSmartphone,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType> = {
  BarChartBig,
  Bell,
  Globe,
  Presentation,
  School,
  TabletSmartphone,
};

const WelcomeUpcoming = () => {
  return (
    <div className="">
      <div className="pt-24 flex flex-col items-center relative z-10">
        <h4 className="text-4xl text-lmsPrimary font-semibold mb-8">
          Upcoming Features
        </h4>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-16 2xl:gap-x-32 gap-y-10 mt-5">
            {upcomingFeatures.map((data, index) => {
              const IconComponent = data.icon ? iconMap[data.icon] : undefined;

              return (
                <div key={index} className="p-5 bg-white opacity-70 rounded-sm hover:shadow-lg hover:shadow-lmsAccent ">
                  <span className="flex flex-col items-center space-y-5">
                    <span className="flex items-center text-lmsAccent space-x-2">
                      {IconComponent && <IconComponent />}{" "}
                      {/* Render the icon */}
                      <h5 className="lg:text-base xl:text-lg font-semibold">{data.heading}</h5>
                    </span>
                    <p className="w-60 lg:text-sm xl:text-base text-center">{data.info}</p>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WelcomeUpcoming;
