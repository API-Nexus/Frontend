export default [
    { path: '/', name: 'Main Page', icon: 'smile', component: './Index' },
    { path: '/interface_info/:id', name: 'View APIs', icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  //{ path: '/welcome',name: 'welcome', icon: 'smile', component: './Index' },
  {
    path: '/user',
    layout: false,
    routes: [{ name: 'login', path: '/user/login', component: './User/Login' }],
  },

  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: 'Admin',
    routes: [
      { icon: 'table',name: 'API Management', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: 'API Analysis', icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis' },
    ],
  },
  //{ path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
