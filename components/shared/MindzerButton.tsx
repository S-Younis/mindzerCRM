import { Pressable, PressableProps, View } from 'react-native';
import React, { useState } from 'react';
import { Flow } from 'react-native-animated-spinkit';

interface MindzerButtonProps extends PressableProps {
  variants: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  isTitleCentered?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  height?: string;
  width?: string;
  isLoading?: boolean;
}

const MindzerButton: React.FC<MindzerButtonProps> = ({
  isTitleCentered,
  isLoading,
  variants = 'primary',
  size,
  width,
  height,
  onPress,
  className,
  children,
  ...props
}) => {
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
    <Pressable
      disabled={isLoading}
      {...props}
      className={`flex-row items-center ${isTitleCentered && 'justify-center'} ${variantClasses[variants]} min-w-[120px] h-[44px]   ${
        height && `h-[${height}]`
      }  ${width && `w-[${width}]`} ${className}  `}
      onPress={onPress}>
      {isLoading ? <Flow className="" size={28} color={'#fafafa'}></Flow> : children}
    </Pressable>
  );
};
export default MindzerButton;
