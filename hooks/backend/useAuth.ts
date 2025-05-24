// // hooks/useAuth.ts
// import { useMutation, useQuery } from '@tanstack/react-query';
// import api from '../lib/api';
// import { useAuthStore } from '../stores/authStore';

// export function useLogin() {
//   return useMutation({
//     mutationFn: async (credentials: { email: string; password: string }) => {
//       const response = await api.post('/auth/login', credentials);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       useAuthStore.getState().setAuth(data.token, data.user);
//     },
//   });
// }

// export function useValidateSession() {
//   return useQuery({
//     queryKey: ['validateSession'],
//     queryFn: async () => {
//       const response = await api.get('/auth/validate');
//       return response.data;
//     },
//     enabled: !!useAuthStore.getState().token,
//     onError: () => {
//       useAuthStore.getState().clearAuth();
//     },
//   });
// }
