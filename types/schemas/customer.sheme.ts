import z from 'zod';

export const FormSchema = z.object({
  sName: z.string().nonempty({ message: 'Customer Name is required' }),
  lstIndustryIds: z.array(z.number()).optional(),
  iAreaId: z.number().int(),
  sLocation: z.string().optional(),
  iUserAppManagerId: z.number().int(),
  iStatusId: z.number().int().optional(),
  iCategoryId: z.number().int(),
  // sLicensor: z.string().optional(),
  // sProcess: z.string().optional(),
  // sCapacity: z.string().optional(),
  // sWebUrl: z.string().url({ message: 'Invalid URL format' }).optional(),
  // iGp_CustomerId_: z.number().nullable().optional(),
});

export type FormDataType = z.infer<typeof FormSchema>;
