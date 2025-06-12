import { useState } from 'react';
import { Text, useWindowDimensions, View, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, } from 'react-native';
import { PlaceholderBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';

const CustomerComment = () => {

    const [richTextContent, setRichTextContent] = useState('');
    // const { id } = useLocalSearchParams<{ id: string }>();
    // const comment = comments.find(comment => comment.id === id);

    const { top } = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const headerHeight = isLandscape ? 32 : 44;
    const keyboardVerticalOffset = headerHeight + top;

    const editor = useEditorBridge({

        autofocus: true,

        avoidIosKeyboard: true,
        initialContent: richTextContent,
        async onChange() {
            const content = await editor.getText()
            setRichTextContent(content);
        },

        bridgeExtensions: [
            ...TenTapStartKit,
            //
            PlaceholderBridge.configureExtension({
                placeholder: 'Add your comment here...',
            }),
        ],

    },);

    const handleSaveComment = async () => {
        // get the rich text content
        const HtmlContent = await editor.getHTML();

        console.log('Saving comment (State -> normall text):', richTextContent);
        console.log('Saving comment (Html Content):', HtmlContent);

        router.back();
    }


    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => <Text onPress={() => router.back()} className='text-blue-400 text-lg'>Cancel</Text>,
                    headerRight: () => <Text onPress={handleSaveComment} className='text-blue-400 text-lg'>Save</Text>,
                }}
            />
            <SafeAreaView style={exampleStyles.fullScreen}>
                <View className='p-3 bg-slate-600' >
                    <Text className='text-red-300 '>{richTextContent}</Text>
                </View>
                <RichText editor={editor} style={{ paddingHorizontal: 10 }} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={exampleStyles.keyboardAvoidingView}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <Toolbar editor={editor} />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );

}

export default CustomerComment;


const exampleStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    keyboardAvoidingView: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
});
