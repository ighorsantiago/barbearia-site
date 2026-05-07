import { useState, useMemo } from 'react'
import { Trash2, Calendar, Phone, User, Clock, LogOut } from 'lucide-react'
import { useBooking } from '../hooks/useBooking'
import config from '../config'

function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
}

function getTodayString(): string {
    return new Date().toISOString().slice(0, 10)
}

export default function AdminDashboard() {
    const [authed, setAuthed] = useState(false)
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const [selectedDate, setSelectedDate] = useState(getTodayString())
    const { getBookingsByDate, deleteBooking } = useBooking()

    const bookings = useMemo(
        () => getBookingsByDate(selectedDate),
        [selectedDate, getBookingsByDate]
    )

    function handleLogin() {
        if (pwd === config.booking?.adminPassword) {
            setAuthed(true)
            setError('')
        } else {
            setError('Senha incorreta.')
        }
    }

    if (!authed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
                    <h1
                        className="text-xl font-semibold mb-1"
                        style={{ color: config.theme.accentColor }}
                    >
                        {config.business.name}
                    </h1>
                    <p className="text-gray-400 text-sm mb-6">Painel do profissional</p>

                    <label className="text-gray-300 text-sm block mb-1">Senha</label>
                    <input
                        type="password"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-amber-500"
                        placeholder="••••••••"
                    />
                    {error && (
                        <p className="text-red-400 text-sm mb-3">{error}</p>
                    )}
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
                        style={{ background: config.theme.accentColor, color: '#000' }}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
                <Calendar size={18} style={{ color: config.theme.accentColor }} />
                <span className="font-semibold">{config.business.name}</span>
                <span className="text-gray-500 text-sm ml-auto mr-4">
                    Painel de agenda
                </span>
                <button
                    onClick={() => setAuthed(false)}
                    className="text-gray-600 hover:text-gray-300 transition-colors"
                    title="Sign out"
                >
                    <LogOut size={16} />
                </button>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="mb-6 flex items-center gap-3">
                    <label className="text-gray-400 text-sm">Data:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-gray-500 text-sm">
                        {formatDate(selectedDate)}
                    </span>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center text-gray-600 py-16">
                        Nenhum agendamento para este dia.
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {bookings.map(b => (
                            <li
                                key={b.id}
                                className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-start justify-between gap-4"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} style={{ color: config.theme.accentColor }} />
                                        <span
                                            className="font-semibold"
                                            style={{ color: config.theme.accentColor }}
                                        >
                                            {b.time}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            — {b.service.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <User size={13} className="text-gray-500" />
                                        {b.clientName}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Phone size={13} className="text-gray-500" />
                                        {b.clientPhone}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteBooking(b.id)}
                                    className="text-gray-600 hover:text-red-400 transition-colors mt-0.5"
                                    title="Cancelar agendamento"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <p className="text-gray-700 text-xs text-center mt-10">
                    {bookings.length} agendamento{bookings.length !== 1 ? 's' : ''} · salvo localmente
                </p>
            </main>
        </div>
    )
}
