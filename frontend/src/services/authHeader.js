import authService from './authService';

const authHeader = () => {
  const user = authService.getCurrentUser();

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};

export default authHeader;