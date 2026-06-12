"use client";
import { login } from "../actions/auth";
import { useActionState } from 'react'

export default function LoginPage() {
    const [state, action, pending] = useActionState(login, undefined)
    return (
        <main>
            <h1>Iniciar sesión</h1>

            <form action={action}>

                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                    />

                    {state?.errors?.email && (
                        <p>{state.errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />

                    {state?.errors?.password && (
                        <p>{state.errors.password[0]}</p>
                    )}
                </div>

                {state?.message && <p>{state.message}</p>}

                <button type="submit" disabled={pending}>
                    Login
                </button>
            </form>
        </main>
    );
}