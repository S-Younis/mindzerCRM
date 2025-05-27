import { Pressable, PressableProps } from 'react-native'
import React, { useState } from 'react'
import { Flow } from 'react-native-animated-spinkit';

interface MindzerButtonProps extends PressableProps {
  variants: 'primary' | 'secondary' | 'outline' | 'danger' | 'success',
  isTitleCentered?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  height?: string
  width?: string
}

const MindzerButton: React.FC<MindzerButtonProps> = ({ isTitleCentered, variants = 'primary', size, width, height, onPress, className, children , ...props }) => {
  //  let sizeClasses = {
  //     md: "px-4 py-2 rounded-md text-base",
  //     lg: "px-5 py-3 rounded-lg text-lg",
  //   }[size];
  const [isLoading, setIsLoading] = useState(false);

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    outline: 'btn-outline',
  };

  return (
    <Pressable {...props} className={`flex-row items-center h-13  ${isTitleCentered && 'justify-center'} ${variantClasses[variants]}  ${height && `h-[${height}]`}  ${width && `w-[${width}]`} ${className} `} onPress={onPress}>
      {isLoading ? (<Flow size={18} className='mr-3  my-auto ' color={'white'}></Flow>) : children}
    </Pressable>
  )
}
export default MindzerButton;