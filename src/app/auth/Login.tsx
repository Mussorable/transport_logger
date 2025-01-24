import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FetchWrapper } from "../../utils/FetchWrapper.tsx";
import { ServerResponse } from "./AppInitializer.tsx";
import { useNotification } from "../../utils/NotificationContext.tsx";

interface LoginForm {
    email: string;
    password: string;
    [key: string]: unknown;
}

function Login() {
    const fetchWrapper = new FetchWrapper('/auth');
    const { addNotification } = useNotification();
    const initialLoginForm: LoginForm = {
        email: '',
        password: '',
    }
    const [loginForm, setLoginForm] = useState<LoginForm>(initialLoginForm);

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        fetchWrapper.post<ServerResponse>('/login', loginForm)
            .then((response) => {
                const { status, message } = response;
                if (status === 'success') window.location.reload();
                addNotification(status, message);
            });
    };
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginForm(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Login</h1>
            <form action="/login" method="POST" onSubmit={ handleSubmitForm }>
                <div className="my-4 flex flex-col">
                    <label htmlFor="email" className="text-xl">Email</label>
                    <input value={loginForm.email} onChange={handleChangeInput} id="email" name="email" type="email" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <div className="my-4 flex flex-col">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input value={loginForm.password} onChange={handleChangeInput} id="password" name="password" type="password" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <button type="submit"
                        className="py-2 w-full font-semibold bg-blue-600 rounded border border-gray-900">Log In
                </button>
                <Link className="block py-2 mt-2 w-full text-center font-semibold bg-pink-600 rounded border border-gray-900" to={"/auth/register"}>Register</Link>
            </form>
        </>
    )
}

export default Login;