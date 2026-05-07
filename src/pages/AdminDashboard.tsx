import { useState, useMemo } from 'react'
import { Trash2, Calendar, Phone, User, Clock, LogOut, ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { useBooking } from '../hooks/useBooking'
import type { BookingStatus } from '../hooks/useBooking'
import config from '../config'

function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
}

function getTodayString(): string {
    return new Date().toISOString().slice(0, 10)
}

function addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + days)
    return date.toISOString().slice(0, 10)
}

function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const statusConfig: Record<BookingStatus, { label: string; color: string }> = {
    pending: { label: 'Pendente', color: '#6b7280' },
    completed: { label: 'Concluído', color: '#22c55e' },
    no_show: { label: 'Não compareceu', color: '#ef4444' },
}

export default function AdminDashboard() {
    const [authed, setAuthed] = useState(false)
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const [selectedDate, setSelectedDate] = useState(getTodayString())

    const { bookings: allBookings, updateStatus, deleteBooking } = useBooking()

    const bookings = useMemo(
        () => allBookings
            .filter(b => b.date === selectedDate)
            .sort((a, b) => a.time.localeCompare(b.time)),
        [allBookings, selectedDate]
    )

    const totalRevenue = useMemo(
        () => bookings
            .filter(b => b.status === 'completed')
            .reduce((sum, b) => sum + b.service.price, 0),
        [bookings]
    )

    const totalPending = useMemo(
        () => bookings.filter(b => b.status === 'pending').length,
        [bookings]
    )

    const totalCompleted = useMemo(
        () => bookings.filter(b => b.status === 'completed').length,
        [bookings]
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
                <span className="text-gray-500 text-sm ml-auto mr-4">Agendamentos</span>
                <button
                    onClick={() => setAuthed(false)}
                    className="text-gray-600 hover:text-gray-300 transition-colors"
                    title="Sair"
                >
                    <LogOut size={16} />
                </button>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">

                {/* Day navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setSelectedDate(prev => addDays(prev, -1))}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-3">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500"
                        />
                        <span className="text-gray-500 text-sm">{formatDate(selectedDate)}</span>
                    </div>

                    <button
                        onClick={() => setSelectedDate(prev => addDays(prev, 1))}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Day summary */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex flex-col gap-1">
                        <span className="text-gray-500 text-xs">Agendamentos</span>
                        <span className="text-white font-semibold text-lg">{bookings.length}</span>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex flex-col gap-1">
                        <span className="text-gray-500 text-xs">Pendentes</span>
                        <span className="text-yellow-400 font-semibold text-lg">{totalPending}</span>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex flex-col gap-1">
                        <span className="text-gray-500 text-xs">Lucro do dia</span>
                        <span className="font-semibold text-lg" style={{ color: config.theme.accentColor }}>
                            {formatCurrency(totalRevenue)}
                        </span>
                    </div>
                </div>

                {/* Completed count */}
                {bookings.length > 0 && (
                    <p className="text-gray-600 text-xs mb-4">
                        {totalCompleted} concluído(s) · {totalPending} pendente(s)
                    </p>
                )}

                {/* Booking list */}
                {bookings.length === 0 ? (
                    <div className="text-center text-gray-600 py-16">
                        Nenhum agendamento para este dia.
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {bookings.map(b => (
                            <li
                                key={b.id}
                                className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} style={{ color: config.theme.accentColor }} />
                                            <span
                                                className="font-semibold"
                                                style={{ color: config.theme.accentColor }}
                                            >
                                                {b.time}
                                            </span>
                                            <span className="text-gray-400 text-sm">— {b.service.name}</span>
                                            <span
                                                className="text-xs px-2 py-0.5 rounded-full"
                                                style={{
                                                    color: statusConfig[b.status].color,
                                                    backgroundColor: statusConfig[b.status].color + '22',
                                                }}
                                            >
                                                {statusConfig[b.status].label}
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

                                        <div className="text-sm font-medium mt-1" style={{ color: config.theme.accentColor }}>
                                            {formatCurrency(b.service.price)}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 items-end">
                                        <button
                                            onClick={() => updateStatus(b.id, 'completed')}
                                            disabled={b.status === 'completed'}
                                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                                            style={{ backgroundColor: '#22c55e22', color: '#22c55e' }}
                                            title="Marcar como concluído"
                                        >
                                            <Check size={12} />
                                            Concluído
                                        </button>

                                        <button
                                            onClick={() => updateStatus(b.id, 'no_show')}
                                            disabled={b.status === 'no_show'}
                                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                                            style={{ backgroundColor: '#ef444422', color: '#ef4444' }}
                                            title="Marcar como não compareceu"
                                        >
                                            <X size={12} />
                                            Não veio
                                        </button>

                                        <button
                                            onClick={() => deleteBooking(b.id)}
                                            className="text-gray-700 hover:text-red-400 transition-colors mt-1"
                                            title="Excluir agendamento"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    )
}
