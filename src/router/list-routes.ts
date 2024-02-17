export interface RouterLink {
    name: string;
    path: string;
    title: string;
  }
  
  
  export const routerLinks: RouterLink[] = [
    { path: '/', name: 'tareas', title: 'Tareas' },
    { path: '/about', name: 'about', title: 'About' },
    { path: '/id', name: 'tarea', title: 'Tarea' }
  ];