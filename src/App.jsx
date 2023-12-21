import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'


function App() {
  const [typing,setTyping]=useState(false);
  const [messages, setMessages] = useState([
    {
      message: 'Hello, Iam chat GPT!',
      sender: 'ChatGPT'
    }
  ])

  const handeleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing'  // message bu user shoun in right
    }
    const newMessages = [...messages, newMessage];  // all the old message + the new messages

    //update our messages state
    setMessages(newMessages);
    
    //set a typing indicator (ChatGPT is typing )
    setTyping(true);
  }

  return (
    <div className='app'>
      <div style={{ position: "relative", height: '700px', width: '800px' }}>
        <MainContainer>
        <ChatContainer>
            <MessageList
              typingIndicator ={typing ? <TypingIndicator content="ChatGPT is typing"/>: null}
              >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handeleSend} />
          </ChatContainer>
        </MainContainer>
      </div>

    </div>
  )
}

export default App
