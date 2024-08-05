"use client";
import React from "react";
import { ClassInfo, classData } from "./attendanceDummyData";
import dynamic from "next/dynamic";

const ExpandableTable = dynamic(() => import("./ExpandableTable"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const classColumns = [
  { key: "class", label: "Class" },
  { key: "section", label: "Section" },
  { key: "total_students", label: "Total Students" },
  { key: "present", label: "Present" },
  { key: "absent", label: "Absent" },
];

const studentColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
];

const getSubData = (classInfo: ClassInfo) => classInfo.students;

const ClassTable = () => {
  return (
    <div className="container mx-auto p-4">
      <ExpandableTable
        data={classData}
        columns={classColumns}
        subColumns={studentColumns}
        getSubData={getSubData}
      />
    </div>
  );
};

export default ClassTable;
