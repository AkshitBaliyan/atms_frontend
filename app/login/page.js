"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { login } from '../services/authApi';
import { useAuth } from '../contexts/authContext';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // assuming you have a styled Input component
import Link from "next/link";
import './Login.css'; // optional for custom styles

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { user, setUser } = useAuth();

    useEffect(() => {
        // Check if user is already logged in
        if(user)
            console.log('already logged in : ', user)
    }, [user]);


    const handleSubmit = async (e) => {
    e.preventDefault();


    try {
        const res = await login(email, password);

        if(res.status == 200) {
            setUser(res.data.user); // Assuming the response contains user data
        }

    // Step 3: Redirect or update auth state
    // router.push('/dashboard'); // Change path as needed
    } catch (err) {
        console.error('Login error:', err.message);
        setError(err.message);
    }

// Handle login logic (redirect, save token, etc.)
}

return (
<div className="flex justify-center items-center bg-gray-100 px-4">
    <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" placeholder="Enter your email" value={email} onChange={(e)=>
                    setEmail(e.target.value)}
                    // required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <Input type="password" placeholder="Enter your password" value={password} onChange={(e)=>
                    setPassword(e.target.value)}
                    // required
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full">Login</Button>
                <Link href="/register" className="text-sm text-center text-blue-600 hover:underline">Don't have an
                account? Register</Link>
            </CardFooter>
        </form>
    </Card>
</div>
);
};

export default Login;
