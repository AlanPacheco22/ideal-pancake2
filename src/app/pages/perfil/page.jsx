"use client"
import React from 'react';
import { useSession } from 'next-auth/react'

export default function Perfil() {

    const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <div>No has iniciado sesión.</div>;
  }

    return (
        <div className='p-4 max-w-screen-lg mx-auto' >
            <section className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto mt-8">
                <div className="flex items-center justify-center mb-4">
                    <img src={session.user.image} alt={`${session.name}'s profile`} className="rounded-full h-20 w-20 object-cover" />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-black">{session.user.name}</h2>
                    <p className="text-gray-600">{session.user.email}</p>
                </div>
                <button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                    //onClick={onDeleteAccount}
                >
                    Eliminar cuenta
                </button>
            </section>

            <div className='p-40' />
            <div className='p-2' />
            <footer className='p-4 bg-gray-800 text-white'>
                <div className="max-w-screen-lg mx-auto">
                    <p className="text-xl">&copy; 2024 Ideal Pancake. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}