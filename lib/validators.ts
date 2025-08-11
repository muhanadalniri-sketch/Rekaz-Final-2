
import { z } from 'zod'
export const woSchema = z.object({ id:z.string(), company:z.literal('OMAN_OIL'), refType:z.literal('WO'), refNumber:z.string().min(1), date:z.string().min(1), status:z.enum(['Open','WaitForApproval','Approved','Completed']), description:z.string().optional(), tags:z.array(z.string()).default([]), createdAt:z.string(), updatedAt:z.string() })
export const wnscSchema = z.object({ id:z.string(), company:z.literal('NAMA'), refType:z.literal('WNSC'), refNumber:z.string().min(1), startDate:z.string().min(1), endDate:z.string().optional(), durationDays:z.number().optional(), notes:z.string().optional(), tags:z.array(z.string()).default([]), createdAt:z.string(), updatedAt:z.string() })
