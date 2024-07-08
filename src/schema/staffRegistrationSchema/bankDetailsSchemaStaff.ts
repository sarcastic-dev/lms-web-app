import { z } from "zod";

const bankDetailsSchema = z.object({
  bankName: z.string().trim(),
  bankAccountNumber: z.string().trim(),
  ifscCode: z.string().trim(),
  accountHolderName: z.string().trim(),
});

export default bankDetailsSchema;
export type BankDetailsSchemaType = z.infer<typeof bankDetailsSchema>;




// import { z } from "zod";

// const bankDetailsSchema = z.object({
//   bankName: z.string().trim().min(1, 'Bank Name is required'),
//   accountNo: z.string().trim().min(1, 'Bank Account Number is required'),
//   ifscCode: z.string().trim().length(11, 'IFSC Code must be 11 characters'),
//   holderName: z.string().trim().min(1, "Account Holder's Name is required"),
// });

// export default bankDetailsSchema;
// export type BankDetailsSchemaType = z.infer<typeof bankDetailsSchema>;
