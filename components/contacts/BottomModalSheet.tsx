import { Text  , StyleSheet , Pressable} from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView }  from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from "react";

type Ref = BottomSheet ;

 const BottomModalSheet = forwardRef<Ref , any>( (  props  , ref )  => {
 const renderBackdrop = useCallback((props:any)=><BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>,[]) 

  return (
        <BottomSheet
          ref={ref}
          snapPoints={['30%']} 
          backdropComponent={renderBackdrop}
          index={-1}
        >
          <BottomSheetView style={styles.contentContainer} >  
              <Text>Awesome 🎉</Text>
               <Pressable onPress={() => ref?.current?.close()} >
               <Text>Close X</Text> 
              </Pressable>
          </BottomSheetView>
        </BottomSheet>
  );
}
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
})

export default BottomModalSheet;