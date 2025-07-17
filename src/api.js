export const api = {
  base: 'http://localhost:3000',  
  
  // TODO: Realiza una petición GET a la API y devuelve los datos
  get: async (param) => {
    try {
      const response = await fetch(`${api.base}${param}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la petición GET:', error);
      throw error;
    }
  },

  // Realiza una petición POST a la API con los datos
  post: async (param, data) => {
    try {
      const response = await fetch(`${api.base}${param}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Error al crear los datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la petición POST:', error);
      throw error;
    }
  },
  
  // Realiza una petición PUT a la API con los datos
  put: async (p, data) => {
    try {
      const response = await fetch(`${api.base}${p}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la petición PUT:', error);
      throw error;
    }
  },

  // Realiza una petición DELETE a la API
  del: async p => {
    try {
      const response = await fetch(`${api.base}${p}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar los datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la petición DELETE:', error);
      throw error;
    }
  }
};
