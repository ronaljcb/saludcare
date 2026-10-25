import {store,reply,payload,mutate} from './core';
const patients=[{id:1,nombre:'Paciente Demo Uno',dni:'00000001',fecha_nac:'1994-04-23',sexo:'F'},{id:2,nombre:'Paciente Demo Dos',dni:'00000002',fecha_nac:'1988-11-05',sexo:'M'},{id:3,nombre:'Paciente Demo Tres',dni:'00000003',fecha_nac:'1998-06-15',sexo:'F'}];
const doctors=[{id:1,nombre:'Lucía',apellido:'Demo',especialidad:'Medicina general'},{id:2,nombre:'Andrés',apellido:'Demo',especialidad:'Cardiología'},{id:3,nombre:'Elena',apellido:'Demo',especialidad:'Pediatría'}];
const exams=[{id:'demo-1',pacienteId:'1',medicoId:'1',tipoExamen:'Sangre',fecha:'2026-10-20T10:00:00',estado:'pendiente',resultado:{Hemoglobina:'Dato ficticio'},comentarios:'Registro de demostración'},{id:'demo-2',pacienteId:'2',medicoId:'2',tipoExamen:'Orina',fecha:'2026-10-21T11:00:00',estado:'completado',resultado:{Color:'Dato ficticio'},comentarios:'Registro de demostración'}];
export async function demoFetch(input: string, init:RequestInit={}):Promise<Response>{
 const url=new URL(input,'https://demo.local'),p=url.pathname,method=(init.method||'GET').toUpperCase();
 if(process.env.NEXT_PUBLIC_DEMO_MODE==='false')return fetch(input,init);
 if(typeof window==='undefined')return reply([]);
 if(p.startsWith('/resumen/')) {
  const [, ,type,id]=p.split('/');const seed=type==='medico'?doctors:patients;
  const entity=store(`saludcare:v1:${type==='medico'?'medicos':'pacientes'}`,seed).find(r=>String(r.id)===id);
  if(!entity)return reply({message:'Registro no encontrado'},404);
  return reply({id:entity.id,[type]:entity,contactos:[],consultas:[{descripcion:'Consulta de demostración',fecha:'2026-10-20T10:00:00',paciente_id:1,paciente_nombre:patients[0].nombre,nombre_medico:'Lucía Demo'}]});
 }
 const category=p.includes('examenes')?'examenes':p.includes('medico')?'medicos':'pacientes';
 const key=`saludcare:v1:${category}`,rows=store(key,category==='examenes'?exams:category==='medicos'?doctors:patients);
 const id=p.split('/').filter(Boolean).at(-1);
 if(method==='GET')return reply(p.match(/\/(?:examenes|pacientes|medicos)\/[^/]+$/)?rows.find(r=>String(r.id)===id)||null:rows);
 return mutate(key,rows,method,id,await payload(init.body));
}
