import z from 'zod';

export const FormSchema = z.object({
  sName: z.string().nonempty({ message: 'Customer Name is required' }),
  lstIndustryIds: z.array(z.number()).optional(),
  iAreaId: z.number().int(),
  // iCategoryId: z.number().int(),
  // iUserAppManagerId: z.number().int(),
  // iCustomerStatusId: z.number().int().optional().default(0),
  // sLocation: z.string().optional(),
  // sLicensor: z.string().optional(),
  // sProcess: z.string().optional(),
  // sCapacity: z.string().optional(),
  // sWebUrl: z.string().url({ message: 'Invalid URL format' }).optional(),
  // iGp_CustomerId_: z.number().nullable().optional(),
});

export type FormDataType = z.infer<typeof FormSchema>;
