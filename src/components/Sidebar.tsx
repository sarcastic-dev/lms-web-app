"use client"
import React from 'react'
import SidebarMenu from './SidebarMenu'
import { SidebarItems } from '@/types'
import { Calendar, LayoutDashboard, Users, CalendarClockIcon, Activity, User, ClipboardCheck, School2 } from 'lucide-react'

const sidebarItems: SidebarItems= {
  links: [
    {label:"Dashboard", href:"/dashboard", icon:LayoutDashboard},
    {label:"Student Information", href:"/studentRegistration", icon:Users},
    {label:"Staff Information", href:"/staffRegistration", icon:User},
    {label:"Attendance", href:"/attendance", icon:ClipboardCheck},
    {label:"Classroom", href:"/student", icon:School2},
    {label:"TimeTable", href:"/", icon:Calendar},
    {label:"Events", href:"/", icon:CalendarClockIcon},
    {label:"Activity", href:"/", icon:Activity},
  ]
}
const Sidebar = () => {
  return (
    <SidebarMenu sidebarItems={sidebarItems} />
  )
}

export default Sidebar
