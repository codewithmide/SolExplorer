"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/app/components/layout/Card";
import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { Button, Textarea } from "@/app/components/molecules/FormComponents";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import sendIcon from "@/public/icons/send.png";
import { saveChat } from "@/app/services/userService";
import { supabase } from "@/app/lib/supabase";
import { User } from "@supabase/supabase-js";
import aiIcon from "@/public/svgs/toly.svg";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { formatTime } from "@/app/utils/helpers";
import { gemini } from "@/app/lib/gemini";
import { ChatMessage } from "@/app/types/chat";
import { MdKeyboardVoice } from "react-icons/md";
import Modal from "@/app/components/layout/Modal";
import InteractiveAudioSVG from "@/app/components/atoms/audioSvg";
import { MicrophoneButton } from "@/app/components/layout/Microphone";
import Loader from "@/app/components/atoms/loader";

const TTSEndpoint = process.env.SOLEXPRLORER_NODE_API_BASE_URL;

const AskToly: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const responseRef = useRef<HTMLDivElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceChatMessages, setVoiceChatMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const newRecognition = new SpeechRecognition();
        newRecognition.continuous = false;
        newRecognition.lang = "en-US";
        newRecognition.interimResults = false;
        newRecognition.maxAlternatives = 1;
        setRecognition(newRecognition);
      } else {
        console.error("Speech recognition not supported in this browser.");
      }
    }
  }, []);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleVoicePrompt = async (transcribedText: string) => {
    setVoiceLoading(true);
    setVoiceError(null);
    const timestamp = new Date();

    try {
      const userMessage: ChatMessage = {
        role: "user",
        content: transcribedText,
        timestamp,
      };

      const updatedMessages = [...voiceChatMessages, userMessage];
      setVoiceChatMessages(updatedMessages);

      const model = await gemini.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent([
        `You are Toly, an AI expert in Solana. Give a response to the following text in a conversational manner, don't give too long responses but you can be expressive when needed, be short and concise as much as possible dont respond with an emoji: ${transcribedText}`,
      ]);

      const rawResponse = await result.response.text();
      const formattedResponse = rawResponse.replace(/```/g, "\n```").trim();

      const aiMessage: ChatMessage = {
        role: "ai",
        content: formattedResponse,
        timestamp: new Date(),
      };
      setVoiceChatMessages((prev: any) => [...prev, aiMessage]);
      const response = await fetch(
        `${TTSEndpoint}/api/generateSpeech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: formattedResponse }),
        }
      );

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.onplay = () => setIsPlaying(true);
        audio.onended = () => setIsPlaying(false);
        await audio.play();

        URL.revokeObjectURL(audioUrl);
      } else {
        throw new Error("Failed to generate speech");
      }
    } catch (err) {
      setVoiceError(
        `Failed to get response: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setVoiceLoading(false);
    }
  };

  const startListening = useCallback(() => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      console.log("Recording started...");
    }
  }, [recognition]);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript;
        console.log(`Transcribed Text: ${transcriptText}`);
        setTranscript(transcriptText);
        handleVoicePrompt(transcriptText);
      };

      recognition.onspeechend = () => {
        recognition.stop();
        setIsListening(false);
        console.log("Recording stopped due to silence.");
      };

      recognition.onerror = (event: any) => {
        console.error(`Error occurred: ${event.error}`);
        if (event.error === "network") {
          setErrorMessage(
            "Network error: Please check your internet connection."
          );
        } else {
          setErrorMessage(`An error occurred: ${event.error}`);
        }
        setIsListening(false);
      };
    }
  }, [recognition, handleVoicePrompt]);

  const handlePrompt = async () => {
    setLoading(true);
    setError(null);
    setPrompt("");
    const timestamp = new Date();
    try {
      const userMessage: ChatMessage = {
        role: "user",
        content: prompt,
        timestamp,
      };
      const updatedMessages = [...chatMessages, userMessage];
      setChatMessages(updatedMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

      const model = await gemini.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const result = await model.generateContent([
        `Hello, you are Toly. You will be asked anything about Solana. Do not introduce yourself in every prompt, Sound more human, use words that are easy to understand as well. Your response should always be in markdown ${prompt}`,
      ]);
      const rawResponse = await result.response.text();
      const formattedResponse = rawResponse.replace(/```/g, "\n```").trim();

      const aiMessage: ChatMessage = {
        role: "ai",
        content: formattedResponse,
        timestamp: new Date(),
      };
      const newMessages = [...updatedMessages, aiMessage];
      setChatMessages(newMessages);
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));

      if (user) {
        await saveChat(`User: ${prompt}\n\nToly: ${formattedResponse}`);
      }

      setPrompt("");
    } catch (err) {
      setError(
        `Failed to get response: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const loadChatMessages = useCallback(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      const parsedMessages: ChatMessage[] = JSON.parse(savedMessages);
      const messagesWithDates = parsedMessages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setChatMessages(messagesWithDates);
    }
  }, []);

  useEffect(() => {
    loadChatMessages();

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [loadChatMessages]);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <DashboardLayout path="Ask Toly">
      <Card>
        <div className="between">
          <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
            Ask Toly
          </h3>
          <div className="w-full flex items-end justify-end pr-6">
            <Button
              link={handleModal}
              classname="px-3  center gap-2 border-[#E5E7EB] dark:border-[#374151] border rounded "
            >
              <p>Speak to Toly</p>
              <MdKeyboardVoice size={28} />
            </Button>
          </div>
        </div>
        <div className="px-6 py-6 flex flex-col gap-5 bg-[#F9FAFB] dark:bg-[#111928] h-[92%] relative">
          <div
            ref={responseRef}
            className="w-full flex-col p-6 gap-5 flex bg-whiteBg dark:bg-darkBg items-start overflow-y-auto mb-20"
            style={{ maxHeight: "calc(100vh - 300px)" }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`w-[70%] ${
                  message.role === "ai"
                    ? "bg-[#EDFAFA] mr-auto"
                    : "bg-[#F3F4F6] ml-auto"
                } p-4 rounded-lg`}
              >
                <div className="flex items-center mb-2">
                  {message.role === "ai" && (
                    <div className="relative mr-2">
                      <Image src={aiIcon} alt="AI" width={26} height={26} />
                      <div className="absolute -bottom-0 -right-1 w-[10px] h-[10px] bg-green-500 rounded-full center animate-pulse">
                        <div className="bg-[#24A843] h-[6px] w-[6px] rounded-full"></div>
                      </div>
                    </div>
                  )}
                  <p className="font-semibold text-xl text-black">
                    {message.role === "user" ? "You" : "Toly"}
                  </p>
                  <span className="ml-auto text-sm text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className="text-black">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({
                        inline,
                        className,
                        children,
                        ...props
                      }: React.HTMLAttributes<HTMLElement> & {
                        inline?: boolean;
                      }) {
                        const match = /language-(\w+)/.exec(className || "");

                        return !inline && match ? (
                          <SyntaxHighlighter
                            language={match[1]}
                            style={atomDark as any} // Explicitly cast atomDark to any or PrismTheme
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="w-full absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center">
            <div className="w-[60%] flex gap-3 bg-[#F9FAFB] dark:bg-[#374151] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg">
              <Textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setPrompt(e.target.value)
                }
                value={prompt}
                placeholder="Ask Toly anything..."
                rows={1}
                maxRows={4}
                classname="textarea-style w-full"
              />
              <Button
                classname=""
                validation={prompt === "" || loading}
                link={handlePrompt}
                loading={loading}
              >
                <Image src={sendIcon} alt="send" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Modal handleModal={handleModal} show={openModal}>
        <div className="mt-4 center flex-col gap-6">
          {isListening ? (
            <MicrophoneButton color="red" />
          ) : isPlaying ? (
            <InteractiveAudioSVG />
          ) : voiceLoading ? (
            <Loader />
          ) : (
            <MicrophoneButton color="blue" onClick={startListening} />
          )}
          {isListening ? (
            <p>Listening...</p>
          ) : isPlaying ? (
            <p></p>
          ) : voiceLoading ? (
            <p className="w-3/4 text-center">{transcript}</p>
          ) : (
            <p>Click the mic to speak to Toly</p>
          )}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AskToly;
