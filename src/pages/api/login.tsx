import InputGroup from '@/src/components/InputGroup';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import cls from 'classnames';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/auth/login',
        {
          password,
          username,
        },
        { withCredentials: true }
      );
      router.push('/login');
    } catch (error: any) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              로그인
            </button>
          </form>
          <small>
            아직 계정이 없으신가요?
            <Link href="/register">
              <span className="ml-1 text-blue-500 uppercase">회원가입</span>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
