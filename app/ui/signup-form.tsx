"use client";

import { signup } from '../actions/auth'
import { useActionState } from 'react'

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <form action={action}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" />
            </div>
            {state?.message && <p>{state.message}</p>}


            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button type="submit" disabled={pending} >
                Sign Up
            </button>
        </form>
    )
}