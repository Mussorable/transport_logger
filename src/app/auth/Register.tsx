import { FormEvent } from "react";

function Register() {
    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        console.log("Register");
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Registration</h1>
            <form action="/register" method="POST" onSubmit={ handleSubmitForm }>
                <div className="flex gap-4 my-4">
                    <div className="flex flex-col">
                        <label htmlFor="fname" className="text-xl">First Name</label>
                        <input id="fname" type="text" className="text-black rounded text-xl bg-white py-1 px-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="sname" className="text-xl">Second Name</label>
                        <input id="sname" type="text" className="text-black rounded text-xl bg-white py-1 px-2"/>
                    </div>
                </div>
                <div className="my-4 flex flex-col">
                    <label htmlFor="email" className="text-xl">Email</label>
                    <input id="email" type="email" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <div className="my-4 flex flex-col">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input id="password" type="password" className="text-black rounded text-xl bg-white py-1 px-2"/>
                </div>
                <button type="submit"
                        className="py-2 w-full font-semibold bg-blue-600 rounded border-[1px] border-gray-900">Register
                </button>
            </form>
        </>
    )
}

export default Register;