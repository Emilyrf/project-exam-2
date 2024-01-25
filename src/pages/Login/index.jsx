import LoginForm from '../../components/Forms/loginForm';

export default function LoginPage() {
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-secondary m-5'>Login to your Holidaze account:</h1>
      <LoginForm />
    </div>
  );
}
