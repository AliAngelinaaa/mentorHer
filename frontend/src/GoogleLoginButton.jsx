import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginButton({ onSuccess, onFailure }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onFailure}
      useOneTap={false}
      type="standard"
      theme="filled_blue"
      size="large"
      context="signin"
      ux_mode="popup"
      auto_select={false}
      itp_support={true}
    />
  );
}

export default GoogleLoginButton;
