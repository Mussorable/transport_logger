import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegistrationForm {
    fname: string;
    sname: string;
    email: string;
    password: string;
}

function Register() {
    const serverUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_PORT + '/auth';
    const navigate = useNavigate();

    const initialRegistrationForm: RegistrationForm = { fname: '', sname: '', email: '', password: '', };
    const [registrationForm, setRegistrationForm] = useState<RegistrationForm>(initialRegistrationForm);

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        fetch(serverUrl + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fname: registrationForm.fname,
                sname: registrationForm.sname,
                email: registrationForm.email,
                password: registrationForm.password,
            }),
            credentials: 'include',
        })
            .then(res => {
                if (res.status === 200) {
                    navigate('/auth/login');
                }

                return res.json();
            })
            .then(data => { if (data.errors) console.error(data); });
    };
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegistrationForm(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Registration</h1>
            <form action="/register" method="POST" onSubmit={ handleSubmitForm }>
                <div className="flex gap-4 my-4">
                    <div className="flex flex-col">
                        <label htmlFor="fname" className="text-xl">First Name</label>
                        <input value={registrationForm.fname} onChange={handleChangeInput} id="fname" name="fname" type="text" className="text-black rounded text-xl bg-white py-1 px-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="sname" className="text-xl">Second Name</label>
                        <input value={registrationForm.sname} onChange={handleChangeInput} id="sname" name="sname" type="text" className="text-black rounded text-xl bg-white py-1 px-2"/>
                    </div>
                </div>
                <div className="my-4 flex flex-col">
                    <label htmlFor="email" className="text-xl">Email</label>
                    <input value={registrationForm.email} onChange={handleChangeInput} id="email" name="email" type="email" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <div className="my-4 flex flex-col">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input value={registrationForm.password} onChange={handleChangeInput} id="password" name="password" type="password" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <button type="submit"
                        className="py-2 w-full font-semibold bg-blue-600 rounded border-[1px] border-gray-900">Register
                </button>
            </form>
        </>
    )
}

export default Register;