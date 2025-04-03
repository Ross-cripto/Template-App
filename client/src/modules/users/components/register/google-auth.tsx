import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { googleLogin } from '@/modules/users/services';
import { useNavigate } from 'react-router';
import { useAuth } from '@/core/context/auth-context';
import type { User } from '@/core/types/user'; // Importa el tipo User

interface GoogleAuthProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

function GoogleAuth({ setError }: GoogleAuthProps) {
  const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse?.credential) {
      try {
        const response = await googleLogin(credentialResponse.credential);

        const token = response.data.token;

        const userData: User = {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          picture: response.data.picture,
        };

        if (userData && token) {
          login(userData, token); 
          setError(null);
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error('Respuesta de autenticación inválida');
        }
      } catch (error: any) {
        setError(error.message || 'Error al iniciar sesión');
      }
    }
  };

  const onError = () => {
    setError('Ocurrió un error al iniciar sesión con Google.');
  };

return (
  <GoogleOAuthProvider clientId={google_client_id}>
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      text="continue_with" 
    />
  </GoogleOAuthProvider>
);
}

export default GoogleAuth;