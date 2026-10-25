"use client";
import type {ComponentType} from 'react';
import {SidebarGroup,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from '@/components/ui/sidebar';
export function NavDocuments({items}:{items:{name:string;url:string;icon:ComponentType<any>}[]}){return <SidebarGroup><SidebarMenu>{items.map(item=><SidebarMenuItem key={item.name}><SidebarMenuButton asChild><a href={item.url}><item.icon/><span>{item.name}</span></a></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroup>}
