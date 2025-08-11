
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
export default function ChartStatusBreakdown({data}:{data:{status:string,count:number}[]}){
  if(!data || data.length===0) return <div className="muted">No data yet</div>
  return (<div style={{width:'100%',height:280}}>
    <ResponsiveContainer><BarChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="status"/><YAxis allowDecimals={false}/><Tooltip/>
    <Bar dataKey="count" fill="#0b61ff"/></BarChart></ResponsiveContainer></div>)
}
