import { Outlet } from 'react-router-dom'
import Navbar from '../navigation/Navbar'

export default function MainLayout() {
  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
