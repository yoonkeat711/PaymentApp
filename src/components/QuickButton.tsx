import React from 'react';
import { Pressable, Image, ImageSourcePropType, Text } from 'react-native';
type QuickButtonProps = {
    icon: ImageSourcePropType,
    text?: string,
    onPress: () => void;

}
const QuickButton = ({ icon, text, onPress }: QuickButtonProps) => {
   return ( <Pressable onPress={onPress}>
        <Image
            source={icon}
            style={{resizeMode: 'contain', height: 44, width: 44}}
        />
        {!!text && <Text>{text}</Text>}
    </Pressable>
   )
};

export default QuickButton;
