export const clearAuthData = () => {
  localStorage.removeItem('vocai_user');
  localStorage.removeItem('vocai_last_path');
  console.log('Auth data cleared');
};

export const checkAuthData = () => {
  const user = localStorage.getItem('vocai_user');
  const path = localStorage.getItem('vocai_last_path');
  
  console.log('Current auth data:', { user, path });
  
  return { user, path };
};
