import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDarkMode } from '../../hooks/useDarkMode'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout: React.FC = () => {
	const { isDark, setIsDark } = useDarkMode()
	const [currentDate, setCurrentDate] = useState('')
	const [sidebarOpen, setSidebarOpen] = useState(false)

	useEffect(() => {
		const getCurrentDate = () => {
			const now = new Date()
			const months = [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre',
			]
			return `${months[now.getMonth()]} ${now.getDate()}`
		}

		setCurrentDate(getCurrentDate())

		const now = new Date()
		const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
		const timeUntilMidnight = tomorrow.getTime() - now.getTime()

		const timer = setTimeout(() => {
			setCurrentDate(getCurrentDate())
		}, timeUntilMidnight)

		return () => clearTimeout(timer)
	}, [])

	const toggleDarkMode = () => {
		setIsDark(!isDark)
	}

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#3A71EC] via-[#6C5CEC] to-[#9949EC] dark:from-[#2F2E7B] dark:via-[#412982] dark:to-[#511F80] transition-colors duration-300">
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div className={`fixed top-0 left-0 h-screen w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
				sidebarOpen ? 'translate-x-0' : '-translate-x-full'
			}`}>
				<Sidebar onClose={() => setSidebarOpen(false)} />
			</div>

			{/* Main content */}
			<div className="lg:ml-64 min-h-screen flex flex-col">
				<Header 
					isDark={isDark} 
					toggleDarkMode={toggleDarkMode} 
					currentDate={currentDate}
					onMenuClick={toggleSidebar}
				/>
				<div className="flex-1">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Layout