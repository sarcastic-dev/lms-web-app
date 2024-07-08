"use client";

import React, { useState, ReactNode, useMemo } from "react";

interface Column {
  key: string;
  label: string;
}

interface ExpandableTableProps<T> {
  data: T[];
  columns: Column[];
  subColumns: Column[];
  getSubData: (row: T) => any[];
  subSearchable?: boolean;
}

const ExpandableTable = <T extends { id: number }>({
  data,
  columns,
  subColumns,
  getSubData,
  subSearchable = true,
}: ExpandableTableProps<T>): ReactNode => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [subSearchTerm, setSubSearchTerm] = useState<string>("");
  const [subSortColumn, setSubSortColumn] = useState<string>("");
  const [subSortDirection, setSubSortDirection] = useState<"asc" | "desc">(
    "asc"
  );

  const toggleExpand = (rowId: number) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
      setSubSearchTerm("");
      setSubSortColumn("");
      setSubSortDirection("asc");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubSearchTerm(event.target.value);
  };

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleSubSort = (columnKey: string) => {
    if (subSortColumn === columnKey) {
      setSubSortDirection(subSortDirection === "asc" ? "desc" : "asc");
    } else {
      setSubSortColumn(columnKey);
      setSubSortDirection("asc");
    }
  };

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        columns.some((column) =>
          row[column.key as keyof T]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      ),
    [data, columns, searchTerm]
  );

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  const getFilteredSubData = (row: T) => {
    const subData = getSubData(row);
    if (!subSearchTerm) return subData;

    return subData.filter((subRow) =>
      subColumns.some((subColumn) =>
        subRow[subColumn.key]
          .toString()
          .toLowerCase()
          .includes(subSearchTerm.toLowerCase())
      )
    );
  };

  const getSortedSubData = (row: T) => {
    const filteredSubData = getFilteredSubData(row);
    if (!subSortColumn) return filteredSubData;

    const sortedSubData = [...filteredSubData].sort((a, b) => {
      const aValue = a[subSortColumn];
      const bValue = b[subSortColumn];

      if (aValue < bValue) return subSortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return subSortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sortedSubData;
  };

  return (
    <div>
      <div className="relative mb-4 w-2/5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md w-full pl-10"
        />
        <svg
          className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m-3.65-1.9A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 9.5 7.3z"
          ></path>
        </svg>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-4 px-8 border-b cursor-pointer text-left font-medium"
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                {sortColumn === column.key && (
                  <span>{sortDirection === "asc" ? " 🔼" : " 🔽"}</span>
                )}
              </th>
            ))}
            <th className="py-4 px-8 border-b text-left font-medium">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleExpand(row.id)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="py-4 px-8 border-b">
                      {row[column.key as keyof T]}
                    </td>
                  ))}
                  <td className="py-4 px-8 border-b text-center">
                    {expandedRow === row.id ? "-" : "+"}
                  </td>
                </tr>
                {expandedRow === row.id && (
                  <tr>
                    <td colSpan={columns.length + 1} className="p-4 bg-gray-50">
                      {subSearchable && (
                        <div className="relative mb-4 w-2/5">
                          <input
                            type="text"
                            value={subSearchTerm}
                            onChange={handleSubSearch}
                            placeholder="Search sub-table..."
                            className="p-2 border border-gray-300 rounded-md w-full pl-10"
                          />
                          <svg
                            className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-4.35-4.35m-3.65-1.9A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 9.5 7.3z"
                            ></path>
                          </svg>
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead className="bg-gray-200">
                            <tr>
                              {subColumns.map((subColumn) => (
                                <th
                                  key={subColumn.key}
                                  className="py-4 px-8 border-b text-left font-medium cursor-pointer"
                                  onClick={() => handleSubSort(subColumn.key)}
                                >
                                  {subColumn.label}
                                  {subSortColumn === subColumn.key && (
                                    <span>
                                      {subSortDirection === "asc"
                                        ? " 🔼"
                                        : " 🔽"}
                                    </span>
                                  )}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {getSortedSubData(row).length > 0 ? (
                              getSortedSubData(row).map((subRow) => (
                                <tr
                                  key={subRow.id}
                                  className="hover:bg-gray-100"
                                >
                                  {subColumns.map((subColumn) => (
                                    <td
                                      key={subColumn.key}
                                      className="py-4 px-8 border-b text-left"
                                    >
                                      {subRow[subColumn.key]}
                                    </td>
                                  ))}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={subColumns.length}
                                  className="py-4 px-4 text-center"
                                >
                                  No results found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-4 px-4 text-center"
              >
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpandableTable;
