import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useAudioRecorder, AudioModule, RecordingPresets, useAudioPlayer } from 'expo-audio';
import MindzerButton from '@/components/shared/MindzerButton';
import { TextInput } from 'react-native-gesture-handler';
import { toast, Toaster } from 'sonner-native';

const OppDetails = () => {
  const { iOpportunityId } = useLocalSearchParams();

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [transcriptedText, setTranscribedText] = useState<string | null>(null);
  const player = useAudioPlayer(audioUri);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied , please enable it in settings.');
        router.back();
      }
    })();
  }, []);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
    setIsRecording(false);
    setAudioUri(audioRecorder.uri);
    console.log('Audio recorded at:', audioRecorder.uri);

    // Transcribe the audio after recording
    transcribeAudio(audioRecorder.uri as string);
  };

  const handlePlaySound = async () => {
    if (audioUri) {
      player.play();
    } else {
      Alert.alert('No audio recorded yet.');
    }
  };

  const transcribeAudio = async (audioUri: string) => {
    const formData = new FormData();
    const blobFile = {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    } as unknown as Blob;
    formData.append('file', blobFile);

    console.log('Transcribing form :', formData);
    try {
      toast.loading('Transcribing...');
      setIsLoading(true);
      const response = await fetch('https://reigujyhhepcnp3xq6qoogd5l40uowxr.lambda-url.eu-north-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const x = await response.json();
      console.log('Transcription response Final : ', x);
      setTranscribedText(x.message || '');

      toast.dismiss();
      setIsLoading(false);
    } catch (error) {
      console.error('Lamdaaaaaaaaaaaa error:', error);
    }
  };

  const handleSummrize = async () => {
    if (!transcriptedText) {
      Alert.alert('No transcribed text available to summarize.');
      return;
    }
    toast.loading('Summarizing...');
    setIsLoading(true);
    const x = await fetch('https://n4ob3gqvyql4i7h5llfbzq26ga0ahnhi.lambda-url.eu-north-1.on.aws/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: transcriptedText }),
      // body: JSON.stringify({
      //   text: `I went to the gym and went to the bathrom and washed my hands and dryed them , after i scanned my face and
      //     entered the gym , then i did some exercises and then i went to the locker room and took a shower and then i went to the sauna and then i went to the pool and then i went to the jacuzzi and then i went to the steam room and then i went to the gym again and then i went home
      //     and then i went to the store and bought some groceries and then i went home and cooked dinner and then i watched some TV and then i went to bed.
      //   `,
      // }),
    });
    const response = await x.json();
    console.log('Summarization response:', response);
    setTranscribedText(response.message || '');
    setIsLoading(false);
    toast.dismiss();
  };

  return (
    <>
      <View className="flex-1 items-center pt-10 ">
        <Text className="adaptive-text">OppDetails of {iOpportunityId as string}</Text>
        <MindzerButton disabled={isLoading} className="mt-2 px-4" onPress={isRecording ? stopRecording : record} variants={'primary'}>
          <Text className="text-light">{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
        </MindzerButton>

        <MindzerButton className="mt-4 px-4" onPress={handlePlaySound} variants={'primary'}>
          <Text className="text-light">Play Sound</Text>
        </MindzerButton>

        <MindzerButton disabled={isLoading} className="mt-4 px-4" onPress={handleSummrize} variants={'primary'}>
          <Text className="text-light">AI : Summrize </Text>
        </MindzerButton>

        <MindzerButton className="mt-4 px-4" onPress={() => setTranscribedText('')} variants={'primary'}>
          <Text className="text-light">Clear</Text>
        </MindzerButton>

        <TextInput
          className="mt-6 pt-4 px-4 h-[280px]  border-[6px] border-slate-500 rounded w-[80%] bg-white"
          multiline
          submitBehavior="blurAndSubmit"
          textAlignVertical="top"
          editable={false}
          value={transcriptedText || ''}
          onChangeText={text => setTranscribedText(text)}
        />

        {/* <Button
        title="Replay Sound"
        onPress={() => {
          player.seekTo(0);
          player.play();
        }}
      /> */}
      </View>
      <Toaster position="top-center" duration={undefined} />
    </>
  );
};

export default OppDetails;
