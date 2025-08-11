
'use client'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db/dexie'
import StatusChip from './StatusChip'
import { useState } from 'react'
const WO_STATUSES = ['Open','WaitForApproval','Approved','Completed'] as const
export default function RecordList(){
  const items = useLiveQuery(()=>db.records.orderBy('createdAt').reverse().toArray(), []) || []
  const [editingId,setEditingId]=useState(''); const [tempStatus,setTempStatus]=useState('Open')
  async function startEdit(r:any){ if(r.refType!=='WO') return; setEditingId(r.id); setTempStatus(r.status) }
  async function saveEdit(id:string){ const rec=await db.records.get(id); if(!rec||rec.refType!=='WO') return; await db.records.update(id, (obj:any) => { if(obj.refType==='WO'){ obj.status = tempStatus as any; obj.updatedAt = new Date().toISOString(); } }); setEditingId('') }
  if(items.length===0) return <div className='card muted'>لا توجد بيانات حتى الآن</div>
   return <div style={{display:'grid', gap:'1rem', alignItems:'center', justifyContent:'space-between', padding:'1rem', background:'transparent'}}>
    {items.map(r=>(<div key={r.id} style={{display:'flex',gap:'.5rem',alignItems:'center',justifyContent:'space-between',padding:'.5rem 0',borderBottom:'1px solid rgba(0,0,0,.06)'}}>
      <div style={{display:'flex',flexDirection:'column'}}><strong>{r.refType} #{r.refNumber}</strong><small className='muted'>{r.company}</small></div>
      <div style={{display:'flex',alignItems:'center',gap:'.5rem'}}>
        {r.refType==='WO' && (editingId===r.id ? (<><select value={tempStatus} onChange={e=>setTempStatus(e.target.value)}>
          {WO_STATUSES.map(s=><option key={s} value={s}>{s}</option>)}</select><button className='btn-concave' onClick={()=>saveEdit(r.id)}>حفظ الحالة</button></>) : (
          <button className='btn-concave' onClick={()=>startEdit(r)} title='تغيير الحالة'><StatusChip label={r.status}/></button>
        ))}
        {r.refType==='WNSC' && <StatusChip label={(r as any).endDate ? 'Completed' : 'In Progress'}/>}
      </div></div>))}
  </div>)
}
