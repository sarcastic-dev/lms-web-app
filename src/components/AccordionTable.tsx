"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from 'lucide-react';

const data = [
  {
    company: 'Company Name',
    amount: 457,
    value: 6535178,
    premiums: '-',
    strategies: [50.71, 49.21, 0],
    details: [
      {
        companyName: 'Sony',
        customerNo: 13245,
        customerName: 'John Doe',
        insuranceNo: 64578,
        strategy: 'A, 100%',
        start: 20000,
        current: 33000,
        diff: 13000,
      },
      {
        companyName: 'Sony',
        customerNo: 13245,
        customerName: 'John Doe',
        insuranceNo: 64578,
        strategy: 'A, 100%',
        start: 20000,
        current: 33000,
        diff: 13000,
      },
      {
        companyName: 'Sony',
        customerNo: 13245,
        customerName: 'John Doe',
        insuranceNo: 64578,
        strategy: 'A, 100%',
        start: 20000,
        current: 33000,
        diff: 13000,
      },
    ],
  },
];

const AccordionTable = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Premiums</TableHead>
          <TableHead>Strategy A</TableHead>
          <TableHead>Strategy B</TableHead>
          <TableHead>Strategy C</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <>
            <TableRow
              key={index}
              className={`cursor-pointer ${openIndex === index ? 'bg-gray-300' : ''}`}
              onClick={() => toggleOpen(index)}
            >
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.amount} pcs</TableCell>
              <TableCell>${item.value}</TableCell>
              <TableCell>{item.premiums}</TableCell>
              <TableCell>{item.strategies[0]}%</TableCell>
              <TableCell>{item.strategies[1]}%</TableCell>
              <TableCell>{item.strategies[2]}%</TableCell>
              <TableCell>
                <ChevronDown className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </TableCell>
            </TableRow>
            {openIndex === index && (
              <motion.tr
                key={`${index}-details`}
                className="bg-gray-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell colSpan={8}>
                  <div className="p-4">
                    <h3>{item.company}</h3>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                    <Table className="w-full border border-gray-300 mt-4">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company name</TableHead>
                          <TableHead>Customer no</TableHead>
                          <TableHead>Customer name</TableHead>
                          <TableHead>Insurance no</TableHead>
                          <TableHead>Strategy</TableHead>
                          <TableHead>Start</TableHead>
                          <TableHead>Current</TableHead>
                          <TableHead>Diff</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {item.details.map((detail, detailIndex) => (
                          <TableRow key={detailIndex} className={detailIndex % 2 === 0 ? 'bg-gray-200' : ''}>
                            <TableCell>{detail.companyName}</TableCell>
                            <TableCell>{detail.customerNo}</TableCell>
                            <TableCell>{detail.customerName}</TableCell>
                            <TableCell>{detail.insuranceNo}</TableCell>
                            <TableCell>{detail.strategy}</TableCell>
                            <TableCell>${detail.start}</TableCell>
                            <TableCell>${detail.current}</TableCell>
                            <TableCell>${detail.diff}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TableCell>
              </motion.tr>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccordionTable;
