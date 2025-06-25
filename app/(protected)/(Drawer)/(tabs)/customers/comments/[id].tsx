import { useEffect, useState } from 'react';
import { Text, useWindowDimensions, View, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, TextInput, Alert } from 'react-native';
import { PlaceholderBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AttachmentsTab from '@/components/customersPage/AttachmentsTab';
import Toast from 'react-native-toast-message';

const CustomerComment = () => {
  const [selectedTabIndx, setSelectedTabIndx] = useState(0);
  const [richTextContent, setRichTextContent] = useState('');
  const [postTitleText, setPostTitleText] = useState('');
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
      const content = await editor.getText();
      setRichTextContent(content);
    },

    bridgeExtensions: [
      ...TenTapStartKit,
      //
      PlaceholderBridge.configureExtension({
        placeholder: 'Add your comment here...',
      }),
    ],
  });

  // to change the color of the editor text
  useEffect(() => {
    const retryInterval = setInterval(() => {
      editor.webviewRef.current?.injectJavaScript(`
      (function() {
        // Try multiple selectors
        const selectors = [
          '.ProseMirror', 
          '.editor', 
          '[contenteditable]',
          'body'
        ];
        
        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.color = '#f8f8f8';
            el.style.paddingLeft = '7px';
            el.style.fontSize = '15px';
            el.style.fontFamily = 'Inter, sans-serif';
            el.style.setProperty('color', '#f8f8f8', 'important');
          });
        });

     
        return true;
      })();
    `);

      // Change the placeholder text color
      editor.webviewRef.current?.injectJavaScript(`
    const style = document.createElement('style');
    style.innerHTML = \`
      .ProseMirror p.is-editor-empty:first-child::before {
        color: #9ca3af !important;  /* Orange color */
        font-size: 15px !important;
        font-weight: 400 !important;
        font-family: 'Inter', sans-serif !important;
      }
    \`;
    document.head.appendChild(style);
    true;
  `);
    }, 0); // Retry every 0 ms until it works

    return () => clearInterval(retryInterval);
  }, [editor]);

  const handleSaveComment = async () => {
    // get the rich text content
    const HtmlContent = await editor.getHTML();

    if (!postTitleText.trim()) {
      // show alert with title 'required' and a body 'Post Title is required'
      if (Platform.OS == 'ios') {
        Alert.alert('Required', 'Post Title is required');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Required',
          text2: 'Post Title is required',
          position: 'top',
        });
      }
      return;
    }
    console.log('Saving comment (State -> normall text):', richTextContent);
    console.log('Saving comment (Html Content):', HtmlContent);

    router.back();

    // KeyBoard Dissmiss
    // editor.webviewRef.current?.injectJavaScript(`
    //   document.querySelector('.ProseMirror').blur();
    // `);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,

          header: () => (
            <View className="flex-row justify-between items-center pt-14 pb-3 px-[16px]">
              <Text onPress={() => router.back()} className="text-blue-400 text-lg">
                Cancel
              </Text>
              <SegmentedControl
                style={{ width: '55%', marginHorizontal: 'auto', borderRadius: 8 }}
                values={['Details', 'Attachments']}
                fontStyle={{ color: '#f8f8f8', fontSize: 11, fontWeight: '500' }}
                backgroundColor="#33343E"
                sliderStyle={{ backgroundColor: '#6A6B75' }}
                selectedIndex={selectedTabIndx}
                onChange={event => {
                  setSelectedTabIndx(event.nativeEvent.selectedSegmentIndex);
                }}
              />
              <Text onPress={handleSaveComment} className="text-blue-400 text-lg">
                Save
              </Text>
            </View>
          ),
          contentStyle: { paddingTop: 8 },
        }}
      />

      <SafeAreaView style={exampleStyles.fullScreen}>
        {selectedTabIndx == 0 && (
          <>
            <View className="p-3 px-4 py-4  border-b border-gray-800">
              <TextInput
                value={postTitleText}
                onChangeText={setPostTitleText}
                placeholder="Post Title"
                style={{ paddingHorizontal: 0, marginHorizontal: 0 }}
                className="w-full adaptive-text placeholder:text-gray-400 "
              />
            </View>
            <RichText
              editor={editor}
              style={{
                backgroundColor: 'transparent', // Fallback for WebView background
              }}
              // containerStyle={{
              //     paddingHorizontal: 10, // Outer padding
              // }}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={exampleStyles.keyboardAvoidingView}
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <Toolbar editor={editor} />
            </KeyboardAvoidingView>
          </>
        )}
        {selectedTabIndx == 1 && <AttachmentsTab />}
      </SafeAreaView>
    </>
  );
};

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
