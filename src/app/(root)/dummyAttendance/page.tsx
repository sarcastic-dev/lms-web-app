"use client";
import React from "react";
import ExpandableTable from "./ExpandableTable";
import { ClassInfo, classData } from "./attendanceDummyData";

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
      <ExpandableTable<ClassInfo>
        data={classData}
        columns={classColumns}
        subColumns={studentColumns}
        getSubData={getSubData}
      />
    </div>
  );
};

export default ClassTable;
