import z from 'zod';

export const FormSchema = z.object({
  sEmail: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  sFullName: z.string().nonempty({ message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters long' }),
  sJobTitle: z.string().nonempty({ message: 'Job Title is required' }),
  sCompany: z.string().nonempty({ message: 'Company is required' }),
  sActive: z.string().nonempty({ message: 'Status is required' }),
  bPrivate: z.string().nonempty({ message: 'bPrivate is required' }),
  sPhoneMobile: z.string().optional(),
  sPhoneBusiness: z.string().optional(),
  sArea: z.string().nonempty({ message: 'Country is required' }),
  sCity: z.string().optional(),
  sAddress: z.string().optional(),
  sComment: z.string().optional(),
});

export type FormDataType = z.infer<typeof FormSchema>;
