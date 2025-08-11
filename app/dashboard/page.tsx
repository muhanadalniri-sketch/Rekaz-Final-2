'use client'
import { useEffect, useState } from 'react'
import { db } from '@/lib/db/dexie'
import KpiCard from '@/components/KpiCard'
import ChartCompletedOverTime from '@/components/ChartCompletedOverTime'
import ChartStatusBreakdown from '@/components/ChartStatusBreakdown'
import ChartWnscDurations from '@/components/ChartWnscDurations'
import { bucketCompletedOverTime, woStatusBreakdown, wnscDurationHistogram } from '@/lib/chart-helpers'
import RecordForm from '@/components/RecordForm'
import RecordList from '@/components/RecordList'

export default function Dashboard(){
  const [records,setRecords]=useState<any[]>([])
  useEffect(()=>{ db.records.toArray().then(setRecords) },[])

  const kpiTotal = records.length
  const kpiWOCompleted = records.filter(r=>r.refType==='WO' && r.status==='Completed').length
  const kpiWNSCCompleted = records.filter(r=>r.refType==='WNSC' && r.endDate).length
  const wnscDurations = records.filter(r=>r.refType==='WNSC' && typeof r.durationDays==='number').map(r=>r.durationDays)
  const avgDuration = wnscDurations.length ? Math.round(wnscDurations.reduce((a,b)=>a+b,0)/wnscDurations.length) : '—'

  return (
    <div className="container" style={{display:'grid', gap:'1rem'}}>
      {/* عنوان الصفحة (وسطناه وغيّرنا النص) */}
      <h1 style={{ textAlign:'center', marginTop: 0 }}>ملخص الشغل في شركة Rekaz</h1>

      {/* لا نستخدم card هنا حتى لا يظهر المربع الكبير — فقط الكروت الصغيرة نفسها */}
      <div className="panel">
        <div className="grid grid-3">
          <KpiCard title="إجمالي السجلات" value={kpiTotal} />
          <KpiCard title="WO مكتملة" value={kpiWOCompleted} />
          <KpiCard title="WNSC مكتملة" value={kpiWNSCCompleted} />
          <KpiCard title="متوسط مدة WNSC (يوم)" value={avgDuration} />
        </div>
      </div>

      {/* الرسوم داخل كروت صغيرة (تبقى موجودة) */}
      <div className="grid grid-3">
        <div className="card">
          <h3 style={{marginTop:0}}>المكتمل عبر الزمن</h3>
          <ChartCompletedOverTime data={bucketCompletedOverTime(records)} />
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>WO حسب الحالة</h3>
          <ChartStatusBreakdown data={woStatusBreakdown(records)} />
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>توزيع مدد WNSC</h3>
          <ChartWnscDurations data={wnscDurationHistogram(records)} />
        </div>
      </div>

      <h2>إضافة سجل</h2>
      {/* RecordForm نفسه يحتوي كلاس .card من الداخل (مستطيل صغير طائر) */}
      <RecordForm pref="OMAN_OIL" />

      <h2>السجلات</h2>
      {/* اللستة بدون غلاف .card كبير — العناصر الداخلية فقط */}
      <RecordList />
    </div>
  )
}
