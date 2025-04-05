import { Toaster } from 'react-hot-toast'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-8">
        {children}
        <Toaster 
          position="top-right"
          containerStyle={{
            top: '80px',
            right: '20px'
          }}
          toastOptions={{
            className: '!bg-white !text-gray-800',
            style: {
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }
          }}
        />
      </main>
    </div>
  )
}