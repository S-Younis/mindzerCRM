import { Pressable } from 'react-native'
import React from 'react'

interface MindzerButtonProps {
  variants: 'primary' | 'secondary' | 'outline' | 'danger' | 'success',
  isTitleCentered?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  height?: string
  width?: string
  onPress?: () => void
  children?: React.ReactNode
  className?: string
}

export default function MindzerButton({ isTitleCentered, variants = 'primary', size, width, height, onPress, className, children }: MindzerButtonProps) {
  //  let sizeClasses = {
  //     md: "px-4 py-2 rounded-md text-base",
  //     lg: "px-5 py-3 rounded-lg text-lg",
  //   }[size];

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    outline: 'btn-outline',
  };

  return (
    <Pressable className={`flex-row ${isTitleCentered && 'justify-center'} ${variantClasses[variants]}  ${height && `h-[${height}]`}  ${width && `w-[${width}]`} ${className}`} onPress={onPress}>
      {children}
    </Pressable>
  )
}