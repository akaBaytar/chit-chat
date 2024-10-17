'use client';

import { useCallback, useState } from 'react';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { CgSpinner } from 'react-icons/cg';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Input from './Input';
import Button from './Button';
import AuthSocialButton from './AuthSocialButton';

import type { Variant } from '@/types';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .catch(() => toast.error('An error occurred.'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) toast.error('Invalid credentials.');
          if (callback?.ok) toast.success('Logged in successfully.');
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className='mt-6 mx-6 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-6 sm:px-10 shadow rounded-lg bg-white'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              id='name'
              label='Name'
              type='text'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id='email'
            label='Email'
            type='email'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id='password'
            label='Password'
            type='password'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button fullWidth type='submit' disabled={isLoading}>
              {isLoading ? (
                <span className='flex justify-center items-center'>
                  <CgSpinner className='animate-spin text-xl text-gray-900' />
                </span>
              ) : variant === 'LOGIN' ? (
                'Log in'
              ) : (
                'Register'
              )}
            </Button>
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                or continue with
              </span>
            </div>
          </div>
          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div className='flex justify-center gap-2 text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === 'LOGIN'
              ? 'New to Chit Chat?'
              : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an account' : 'Log in'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
