export interface Student {
  id: number;
  name: string;
  status: string;
}

export interface ClassInfo {
  id: number;
  section: string;
  class: string;
  total_students: number;
  present: number;
  absent: number;
  students: Student[];
}
export const classData: ClassInfo[] = [
  {
    id: 101,
    section: "A",
    class: "10th Grade",
    total_students: 30,
    present: 28,
    absent: 2,
    students: [
      { id: 1, name: "Alice Johnson", status: "present" },
      { id: 2, name: "Bob Smith", status: "present" },
      { id: 3, name: "Charlie Brown", status: "absent" },
      { id: 4, name: "David Wilson", status: "present" },
      { id: 5, name: "Eva Green", status: "present" },
      { id: 6, name: "Frank Ocean", status: "present" },
      { id: 7, name: "Grace Lee", status: "present" },
      { id: 8, name: "Hannah Wright", status: "absent" },
      { id: 9, name: "Ian Collins", status: "present" },
      { id: 10, name: "Jack White", status: "present" },
    ],
  },
  {
    id: 102,
    section: "B",
    class: "11th Grade",
    total_students: 25,
    present: 23,
    absent: 2,
    students: [
      { id: 11, name: "Kate Williams", status: "present" },
      { id: 12, name: "Leo Brown", status: "absent" },
      { id: 13, name: "Maria Davis", status: "present" },
      { id: 14, name: "Nina Scott", status: "present" },
      { id: 15, name: "Oscar Lewis", status: "present" },
      { id: 16, name: "Paul Walker", status: "present" },
      { id: 17, name: "Quincy Adams", status: "present" },
      { id: 18, name: "Rachel Green", status: "absent" },
      { id: 19, name: "Sam Harris", status: "present" },
      { id: 20, name: "Tina Turner", status: "present" },
    ],
  },
  // // Additional sections
  // ...Array.from({ length: 38 }, (_, i) => {
  //   const sectionId = 103 + i;
  //   const sectionLetter = String.fromCharCode(67 + i);
  //   const totalStudents = Math.floor(Math.random() * 21) + 40; // Random between 40 and 60
  //   const presentStudents = Math.floor(Math.random() * totalStudents);
  //   const absentStudents = totalStudents - presentStudents;

  //   const students = Array.from({ length: totalStudents }, (_, j) => ({
  //     id: 21 + i * 100 + j,
  //     name: `Student ${21 + i * 100 + j}`,
  //     status: j < presentStudents ? "present" : "absent",
  //   }));

  //   return {
  //     id: sectionId,
  //     section: sectionLetter,
  //     class: `${10 + Math.floor(i / 2)}th Grade`, // Alternating between 10th and 11th Grade
  //     total_students: totalStudents,
  //     present: presentStudents,
  //     absent: absentStudents,
  //     students: students,
  //   };
  // }),
];
