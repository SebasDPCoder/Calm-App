import { api } from './api.js'; 

export const auth = {
  login: async (email, password) => {
    // Si la contraseña coincide, guarda el usuario en localStorage
    // Lanza un error si las credenciales no son válidas
    const users = await api.get(`/users?email=${email}`);
    if (users.length === 0 || users[0].password !== password) {
      throw new Error('Credenciales inválidas');
    }
    const user = users[0];
    localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario en localStorage
  },
  
  register: async (name, email, password) => {
    // Si no existe, registra el usuario y guárdalo en localStorage
    // Lanza un error si el email ya está registrado
    const existingUser = await api.get(`/users?email=${email}`);
    if (existingUser.length > 0) {
      throw new Error('El email ya está registrado');
    }
    const newUser = { name, email, password: password, role:"visitor" };
    await api.post('/users', newUser);
  },

  // Implementa la función de logout
  logout: () => {
    //Elimina el usuario de localStorage y redirige a login
    localStorage.removeItem('user'); 
    location.pathname = '/login';
  },

  // Devuelve true si hay usuario autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('user'); 
  },

  // Redirecciona al dashboard
  back:() => {
    location.pathname = '/home';
  },


  getUser: () => {
    // Devuelve el usuario guardado en localStorage (o null)
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; 
  }
};