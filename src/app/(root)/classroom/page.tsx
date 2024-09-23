"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/newButton";
import { CloudUpload, EllipsisVertical, Plus, Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Stage } from "@/types";
import { colorPalette } from "@/Constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";

import Link from "next/link"; // Import Link for navigation
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation

import CreateClassroomModal from "@/components/CreateClassroomModal";
import withAuthCheck from "@/components/withAuthCheck";

// Custom sorting function for stages
const stageOrder = [
  "12",
  "11",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "LKG",
  "UKG",
];

const customStageSort = (a: string, b: string) => {
  const indexA = stageOrder.indexOf(a);
  const indexB = stageOrder.indexOf(b);
  return indexB - indexA; // Sort in descending order
};

const Page: React.FC = () => {
  const [data, setData] = useState<Stage[]>([]);
  const router = useRouter(); // useRouter for navigation
  const [initialState, setInitialState] = useState(true);
  const instituteId = Cookies.get("instituteId");
  const accessToken = Cookies.get("accessToken");

  const fetchData = async () => {
    if (!instituteId) return;
    if (!accessToken) return;
    try {
      const { data } = await axiosInstance.get<Stage[]>(
        `/classes/institute/${instituteId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAddSection = async (id: string) => {
    if (!instituteId) return;
    if (!accessToken) return;

    try {
      const res = await axiosInstance.post(
        "/sections",
        {
          classId: id,
          instituteId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewClass = (
    sectionId: string,
    sectionName: string,
    classLevel: string
  ) => {
    router.push(
      `/viewclass?sectionId=${sectionId}&sectionName=${sectionName}&classLevel=${classLevel}`
    );
  };

  const handleInitialState = () => {
    setInitialState(false);
    console.log(initialState);
  };

  const sortedData = Array.isArray(data)
    ? data
        .sort((a, b) => customStageSort(a.stage, b.stage))
        .map((stage) => ({
          ...stage,
          classes: stage.classes.map((classData) => ({
            ...classData,
            sections: classData.sections.sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          })),
        }))
    : [];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {initialState ? (
        <CreateClassroomModal handleInitialState={handleInitialState} />
      ) : (
        <div className="flex flex-col">
          <div className="h-20 flex items-center justify-between border-b border-lms-100 px-16">
            <h4 className="font-bold text-lmsPrimary text-2xl">Classroom</h4>
            <Button
              variant={"lmsOutline"}
              iconName="cloudUpload"
              className="py-0 h-9"
            >
              {/* <CloudUpload size={18} className="mr-2" /> */}
              Bulk Upload
            </Button>
          </div>

          {sortedData.map((stage, stageIndex) => (
            <div className="mx-16 my-4" key={stageIndex}>
              <div className="mb-6">
                <h5 className="font-semibold text-xl text-lmsPrimary">
                  {stage.stage}
                </h5>
              </div>

              <div className="flex flex-row items-center flex-wrap gap-9">
                {stage.classes.map((classData, classIndex) => {
                  const color = colorPalette[classIndex % colorPalette.length];
                  return (
                    <div
                      className={`bg-white p-4 shadow-md rounded-md w-80 ${color.shadowColor} outline outline-1 ${color.outlineColor}`}
                      key={classData.id}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg text-lmsPrimary font-medium mb-4">
                          {classData.name}
                        </h3>
                        <div className="mb-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild className="rounded">
                              <Button
                                variant="ghost"
                                iconName="ellipsisVertical"
                                className="border-none bg-none py-0 px-0 hover:bg-white"
                              ></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              className="w-[150px] -mt-3"
                            >
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => handleAddSection(classData.id)}
                                  className="text-lmgSecondary font-semibold text-xs"
                                >
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAddSection(classData.id)
                                      }
                                      className="text-lmgSecondary font-semibold text-xs"
                                    >
                                      <Plus size={15} className="mr-2" /> Add
                                      Section
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem className="text-red-600 font-semibold text-xs">
                                      <Trash2 size={15} className="mr-2" />{" "}
                                      Delete Section
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {classData.sections.map((section) => (
                          <Button
                            key={section.id}
                            variant={"lmsOutline"}
                            className={`h-9 ${color.bgColor} text-lmsSecondary outline-transparent`}
                            onClick={() =>
                              handleViewClass(
                                section.id,
                                section.name,
                                classData.level
                              )
                            }
                          >
                            {`Section ${section.name}`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default withAuthCheck(Page);
