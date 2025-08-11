
import Dexie, { Table } from 'dexie'
export interface BaseRecord { id:string; company:'OMAN_OIL'|'NAMA'; refType:'WO'|'WNSC'; refNumber:string; tags?:string[]; createdAt:string; updatedAt:string }
export interface WORecord extends BaseRecord { company:'OMAN_OIL'; refType:'WO'; date:string; status:'Open'|'WaitForApproval'|'Approved'|'Completed'; description?:string }
export interface WNSCRecord extends BaseRecord { company:'NAMA'; refType:'WNSC'; startDate:string; endDate?:string; durationDays?:number; notes?:string }
export type AnyRecord = WORecord | WNSCRecord
class RekazDB extends Dexie{ records!:Table<AnyRecord,string>; constructor(){ super('rekaz-db'); this.version(1).stores({ records:'id, &refNumber, company, refType, status, date, startDate, endDate, createdAt' }) } }
export const db = new RekazDB()
