import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

const page = async () => {
  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "Aryan Singh",
        fatherName: "Vijay Singh",
        class: "12 - A",
        rollNumber: "1"
      },
      {
        id: "2",
        name: "Archit Sharma",
        fatherName: "Bipin Sharma",
        class: "12 - A",
        rollNumber: "2"
      },
      {
        id: "3",
        name: "Aryaman Agrawal",
        fatherName: "Sanjay Agrawal",
        class: "12 - A",
        rollNumber: "3"
      },
      {
        id: "4",
        name: "Anmol Singh",
        fatherName: "Gabbar Singh",
        class: "12 - A",
        rollNumber: "4"
      },
      {
        id: "5",
        name: "Arihant Verma",
        fatherName: "Sachin Verma",
        class: "12 - A",
        rollNumber: "5"
      },
      {
        id: "6",
        name: "Babli Gupta",
        fatherName: "Raju Gupta",
        class: "12 - A",
        rollNumber: "6"
      },
      {
        id: "7",
        name: "Bobby Khan",
        fatherName: "Sabbir Khan",
        class: "12 - A",
        rollNumber: "7"
      },
      {
        id: "8",
        name: "Chandni Sharma",
        fatherName: "Ashutosh Sharma",
        class: "12 - A",
        rollNumber: "8"
      },
      {
        id: "9",
        name: "Deepak Gupta",
        fatherName: "Rajiv Gupta",
        class: "12 - A",
        rollNumber: "9"
      },
      {
        id: "10",
        name: "Esha Agrawal",
        fatherName: "Anmol Agrawal",
        class: "12 - A",
        rollNumber: "10"
      },
      // ...
    ];
  }

    const data = await getData();
    return (
      <div className="m-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-2xl font-bold">12 - A</h3>
            <Pencil size={15} color="blue" />
          </div>
          <Trash2 size={20} color="red" />
        </div>

        <div className="flex flex-col p-5 mt-5 w-full h-fit bg-gray-50 rounded shadow-lg overflow-hidden">
          <div className="flex items-center justify-center p-2 bg-orange-100 w-16 rounded">
            <p className="text-[10px] font-semibold text-orange-400">Pending</p>
          </div>
          <p className="mt-3 text-sm font-bold">
            Manage class teacher, attendance for 12 - A
          </p>
          <p className="mt-2 text-xs text-gray-400 font-medium">
            Class teacher is responsible for day to day activities of the class
          </p>
        </div>
        <div className="flex mt-[2px] bg-gray-50 w-full rounded shadow-lg overflow-hidden">
          <Button className="space-x-1 text-blue-500" variant={"ghost"}>
            <span>
              <Plus size={12} />
            </span>
            <p className="text-xs font-semibold">Assign Class Teacher</p>
          </Button>
        </div>

        <div className="flex flex-col p-5 mt-5 w-full h-fit bg-gray-50 rounded shadow-lg overflow-hidden">
          <p className="text-sm font-bold">Manage students for 12 - A</p>
          <p className="mt-2 text-xs text-gray-400 font-medium">
            Add or remove students for the class
          </p>
        </div>
        <div className="flex mt-[2px] bg-gray-50 w-full rounded shadow-lg overflow-hidden">
          <Button className="space-x-1 text-blue-500" variant={"ghost"}>
            <span>
              <Plus size={12} />
            </span>
            <p className="text-xs font-semibold">Add Students</p>
          </Button>
        </div>

        <div className="flex mt-5 bg-gray-50 w-full rounded">
          <DataTable columns={columns} data={data} isLoading={false} />
        </div>
      </div>
    );
  }

export default page;
