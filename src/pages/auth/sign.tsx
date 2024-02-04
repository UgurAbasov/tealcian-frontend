import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import refresh from '@/utils/refresh';
import checkAuth from '@/utils/checkAuth';
import isValidate from '@/utils/validation';
import ErrorModel from '@/components/ErrorModel';
const SignUp = () => {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState('');
  const [validation, setValidation] = useState({
    isError: false,
    massage: '',
    solution: '',
    isServerError: false,
  });

  const router = useRouter();

  const onChange = (event: any) => {
    setValue({
      ...value,
      [event.target.id]: event.target.value,
    });
  };

  const onClick = async (event: any) => {
    const type = event.currentTarget.getAttribute('data-name');
    if (type === 'own') {
      const validationResponse = isValidate(value);
      if (validationResponse.massage === 'good') {
        setButtonLoading(type);
        const response = await fetch(
          `${process.env.BACKEND_URL}/auth/sign`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '<origin>',
            },
            body: JSON.stringify(value),
          }
        );
        const data = response.json();
        data.then(result => {
          if (result.accessToken) {
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            router.push('/chat');
          } else {
            setButtonLoading('');
            setValidation({
              isError: true,
              massage: result.response.massage,
              solution: result.response.solution,
              isServerError: true,
            });
          }
        });
      } else {
        setValidation({
          isError: true,
          massage: validationResponse.massage,
          solution: validationResponse.solution,
          isServerError: false,
        });
      }
    } else {
      setButtonLoading(type);
      router.push(`${process.env.BACKEND_URL}/auth/${type}-redirect`);
    }
  };

  return (
    <>
      <div className=' flex flex-col items-center justify-center h-screen'>
        <h1 className=' mb-[3px] text-center sm:text-[30px] text-xl   text text-[#444053]'>
          Welcome
        </h1>
        <div className=' mb-[24px] mr-auto ml-auto  break-all sm:w-[230px] w-[188px]'>
          <p className='text-[#716D7D] sm:text-[20px] text-center'>
            Create account for talking with people
          </p>
        </div>
        <div className=' mr-auto ml-auto w-[278px] sm:w-[350px]'>
          {validation.isError && (
            <ErrorModel
              errorType={validation.isServerError ? 'Server error occured' : 'Invalid Data'}
              massage={validation.massage}
              solving={validation.solution}
              function={() =>
                setValidation({
                  isError: false,
                  massage: '',
                  solution: '',
                  isServerError: false,
                })
              }
            />
          )}
          <input
            type='text'
            id='name'
            onChange={onChange}
            className=' mb-[17px] w-[278px] sm:w-[350px] h-[42px] border-none p-2 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-blue-700'
            placeholder='username'
          />
          <input
            type='email'
            id='email'
            onChange={onChange}
            className=' mb-[17px] w-[278px] sm:w-[350px] h-[42px] border-none p-2 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-blue-700'
            placeholder='email'
          />
          <input
            type='password'
            id='password'
            onChange={onChange}
            className=' mb-[4px] w-[278px] sm:w-[350px] h-[42px] border-none p-2 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-blue-700'
            placeholder='password'
          />
          <h1 className=' mb-[20px] text-gray-400'>
            You already have an account{' '}
            <Link href='/auth/login' className=' text-black'>
              Login
            </Link>{' '}
            ?
          </h1>
          <button
            type='button'
            data-name='own'
            onClick={onClick}
            className='w-[278px] sm:w-[350px] h-[42px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            {buttonLoading !== 'own' ? 'Sign in' : <span className='loader'></span>}
          </button>
          <button
            type='button'
            data-name='github'
            onClick={onClick}
            className='w-[278px] sm:w-[350px] text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2'>
            {buttonLoading !== 'github' ? (
              <div className=' flex justify-center items-center w-full'>
                <svg
                  className='w-4 h-4 mr-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fill-rule='evenodd'
                    d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                    clip-rule='evenodd'
                  />
                </svg>
                Login with Github
              </div>
            ) : (
              <span className='loader'></span>
            )}
          </button>
          
        </div>
      </div>
    </>
  );
};

export default SignUp;
