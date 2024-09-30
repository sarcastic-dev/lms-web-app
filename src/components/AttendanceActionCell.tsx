import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/LmsDataTable"; // Assuming you already have this
import { ArrowUpDown } from "lucide-react";

type ViewState = "view" | "add" | "edit";

interface ActionCellProps {
  sectionId: string;
  attendanceRecords: {
    studentName: string;
    fatherName: string;
    status: string;
  }[]; // Define attendance record structure
  fetchById: (studentId: string) => any;
  setViewState: (state: ViewState) => any;
}

const ActionCell: React.FC<ActionCellProps> = ({
  attendanceRecords,
  setViewState,
}) => {
  const [open, setOpen] = useState(false);

  const handleShowStudentsClick = () => {
    setOpen(true);
    setViewState("view");
  };

  return (
    <>
    <div className="flex justify-center">
      <Button
        variant={"link"}
        className="p-0"
        onClick={handleShowStudentsClick}
      >
        Show Students
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
          <DialogTitle></DialogTitle>
          <DialogDescription>
          </DialogDescription>
        <DialogContent className="max-w-7xl">
          <div>
            {/* Render the DataTable component here to show student data */}
            <DataTable
              columns={[
                // Define columns for students
                {
                  accessorKey: "studentName",
                  header: ({ column }) => (
                    <Button
                      variant="ghost"
                      className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      Student Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ),
                },
                {
                  accessorKey: "parentName",
                  header: ({ column }) => (
                    <Button
                      variant="ghost"
                      className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      Father Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ),
                },
                {
                  accessorKey: "status",
                  header: ({ column }) => (
                    <Button
                      variant="ghost"
                      className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ),
                },
              ]}
              headingText={`Total Students (${attendanceRecords.length})`}
              data={attendanceRecords} // Pass the attendanceRecords data
              isLoading={false}
              searchColumn="studentName"
            />
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
};

export default ActionCell;
