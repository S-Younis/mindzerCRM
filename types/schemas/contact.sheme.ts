import z from 'zod';

export const FormSchema = z.object({
  sEmail: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  sFullName: z.string().nonempty({ message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters long' }),
  sJobTitle: z.string().optional(),
  sCompany: z.string().nonempty({ message: 'Company is required' }),
  bPrivate: z.boolean(),
  sPhoneMobile: z.string().optional(),
  sPhoneBusiness: z.string().optional(),
  sArea: z.number(),
  sCity: z.string().optional(),
  sAddress: z.string().optional(),
  sComment: z.string().optional(),

  //  sFullName: "",
  // sPhoneBusiness: "",
  // sPhoneMobile: "",
  // sComment: "",
  // sEmail: "",
  // sBusinessAddressCity: "",
  // sBusinessAddressCountry: "",
  // sFullAddress: "",
  // sJobTitle: "",
  // eCompany: 0,
  // iCompanyId: 0,
  // bPrivate: false,
});

export type FormDataType = z.infer<typeof FormSchema>;
