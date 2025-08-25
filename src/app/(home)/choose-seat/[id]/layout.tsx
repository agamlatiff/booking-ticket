'use client'

import React, { type FC, type ReactNode } from 'react'
import SeatProvider from './providers/SeatProvider'

interface LayoutProps{
  children: ReactNode
}

const Layout : FC<LayoutProps> = ({children}) => {
  return (
    <SeatProvider>{children}</SeatProvider>
  )
}

export default Layout 