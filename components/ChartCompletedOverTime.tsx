
'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
export default function ChartCompletedOverTime({data}:{data:{date:string,count:number}[]}){
  if(!data || data.length===0) return <div className="muted">No data yet</div>
  return (<div style={{width:'100%',height:280}}>
    <ResponsiveContainer><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date"/><YAxis allowDecimals={false}/><Tooltip/>
    <Line type="monotone" dataKey="count" dot={false} stroke="#0b61ff"/></LineChart></ResponsiveContainer></div>)
}
