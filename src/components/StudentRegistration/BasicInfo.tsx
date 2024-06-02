import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

const BasicInfo = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="student_mobile_number" className="pl-1 text-blue-500 font-semibold">
          Student Number
        </Label>
        <div className="flex">
          <div className="relative">
            <Select>
              <SelectTrigger >
                <SelectValue placeholder="+91" />
              </SelectTrigger>
              <SelectContent className="w-[80px] p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectItem value="ind">+91</SelectItem>
                <SelectItem value="us">+21</SelectItem>
                <SelectItem value="aus">+1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <input
            id="student_mobile_number"
            type="tel"
            className="border border-gray-300 border-l-0 rounded-r-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Mobile Number"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
