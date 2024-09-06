import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { AppDispatch } from "@/context/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"; // Modal component
import { DataTable } from "@/components/LmsDataTable"; // Assuming you already have this

type ViewState = "view" | "add" | "edit";

interface ActionCellProps<T> {
  sectionId: string;
  fetchById: (sectionId: string) => any;
  setViewState: (state: ViewState) => any; // Strictly typed
}

const ActionCell = <T extends string | null>({
  sectionId,
  fetchById,
  setViewState,
}: ActionCellProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [studentsData, setStudentsData] = useState<any[]>([]); // Store student data

  const handleShowStudentsClick = async () => {
    try {
      // Modify this part to fetch attendance records by student ID
      const response = await fetchById(sectionId);

      if (response?.attendanceRecords) {
        setStudentsData(response.attendanceRecords); // Extract attendanceRecords array
      } else {
        console.error("Unexpected data format:", response);
      }
      
      setOpen(true);
      dispatch(setViewState("view")); // Correctly typed
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  return (
    <>
      <Button
        variant={"link"}
        className="p-0"
        onClick={handleShowStudentsClick}
      >
        Show Data
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Class Students</DialogTitle>
          </DialogHeader>
          <div>
            {/* Render the DataTable component here to show student data */}
            <DataTable
              columns={[
                // Define columns for students
                { header: "Student Name", accessorKey: "studentName" },
                { header: "Father Name", accessorKey: "fatherName" },
                { header: "Status", accessorKey: "status" },
                // Add more columns as necessary
              ]}
              data={studentsData} // Pass the fetched student data
              isLoading={false}
              students={[]} // Pass empty array or actual students if needed
              sectionId={null}
              fetchSectionDetails={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionCell;
