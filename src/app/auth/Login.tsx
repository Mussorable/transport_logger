import { FormEvent } from "react";

function Login() {
    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        console.log("Register");
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Login</h1>
            <form action="/login" method="POST" onSubmit={ handleSubmitForm }>
                <div className="my-4 flex flex-col">
                    <label htmlFor="email" className="text-xl">Email</label>
                    <input id="email" type="email" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <div className="my-4 flex flex-col">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input id="password" type="password" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <button type="submit"
                        className="py-2 w-full font-semibold bg-blue-600 rounded border-[1px] border-gray-900">Log In
                </button>
            </form>
        </>
    )
}

export default Login;