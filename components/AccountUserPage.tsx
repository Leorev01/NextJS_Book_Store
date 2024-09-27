import React from 'react'
import { Button } from './ui/button'

const AccountUserPage = ({user, handleLogout}: {user: string | null, handleLogout: () => void}) => {
  return (
    <section>
        <h1>Welcome {user}</h1>
        <Button onClick={handleLogout}>Logout</Button>
    </section>
  )
}

export default AccountUserPage