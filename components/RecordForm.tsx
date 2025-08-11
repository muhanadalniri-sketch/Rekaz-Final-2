
'use client'
import { useState } from 'react'
import { db } from '@/lib/db/dexie'
import { woSchema, wnscSchema } from '@/lib/validators'
type Company = 'OMAN_OIL'|'NAMA'; type RefType = 'WO'|'WNSC'
export default function RecordForm({pref}:{pref:Company}){
  const [refType, setRefType] = useState<RefType>(pref==='OMAN_OIL'?'WO':'WNSC')
  const [refNumber,setRefNumber]=useState('')
  const [date,setDate]=useState(''); const [status,setStatus]=useState('Open'); const [description,setDescription]=useState('')
  const [startDate,setStartDate]=useState(''); const [endDate,setEndDate]=useState(''); const [notes,setNotes]=useState('')
  const [error,setError]=useState('')
  async function onSave(){
    setError(''); try{
      const id = crypto.randomUUID(); const now = new Date().toISOString()
      if(refType==='WO'){
        const payload:any={ id, company:'OMAN_OIL', refType:'WO', refNumber, date, status:status as any, description, tags:[], createdAt:now, updatedAt:now }
        woSchema.parse(payload); await db.records.put(payload)
      }else{
        let durationDays: number | undefined = undefined
        if(startDate && endDate){ const ms=new Date(endDate).getTime()-new Date(startDate).getTime(); durationDays=Math.ceil(ms/(1000*60*60*24)) }
        const payload:any={ id, company:'NAMA', refType:'WNSC', refNumber, startDate, endDate:endDate||undefined, durationDays, notes, tags:[], createdAt:now, updatedAt:now }
        wnscSchema.parse(payload); await db.records.put(payload)
      }
      setRefNumber(''); setDate(''); setStatus('Open'); setDescription(''); setStartDate(''); setEndDate(''); setNotes(''); alert('Saved')
    }catch(e:any){ setError(e.message) }
  }
  return (<div className='card' style={{display:'grid',gap:'.5rem'}}>
    <div style={{display:'flex',gap:'.5rem',alignItems:'center'}}><label className='chip'>نوع السجل</label>
    <select value={refType} onChange={e=>setRefType(e.target.value as RefType)}><option value='WO'>WO (Oman Oil)</option><option value='WNSC'>WNSC (NAMA)</option></select></div>
    <label>الرقم المرجعي*</label><input value={refNumber} onChange={e=>setRefNumber(e.target.value)} />
    {refType==='WO' && (<><label>التاريخ*</label><input type='date' value={date} onChange={e=>setDate(e.target.value)} />
    <label>الحالة*</label><select value={status} onChange={e=>setStatus(e.target.value)}><option>Open</option><option>WaitForApproval</option><option>Approved</option><option>Completed</option></select>
    <label>الوصف</label><textarea value={description} onChange={e=>setDescription(e.target.value)} /></>)}
    {refType==='WNSC' && (<><label>تاريخ البداية*</label><input type='date' value={startDate} onChange={e=>setStartDate(e.target.value)} />
    <label>تاريخ النهاية (اختياري)</label><input type='date' value={endDate} onChange={e=>setEndDate(e.target.value)} />
    <label>ملاحظات</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} /></>)}
    {error && <div style={{color:'crimson'}}>{error}</div>}
    <button className='btn-concave' onClick={onSave}>حفظ</button></div>)
}
