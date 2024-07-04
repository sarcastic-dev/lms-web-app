import * as z from "zod";

const OTPSchema = z.array(z.string().length(1).regex(/^\d$/)).length(6);
