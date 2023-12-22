import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const Api_key='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';
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

    //procces message to chatGPT (send it over and see the response)
    await proccesMessageToChatGPT(newMessages)
  }
  async function proccesMessageToChatGPT(chatMessages){
        //chat Messages {sender: 'user' or 'chatGPT' , messages:'the message content here'}
        //apiMessages {role : 'user' or 'assistant', content : "the message content here "};

        // there tree role in chat gpt is role:assistant => chatgpt speak,
        // role: user => user experience
         //role : system => how he should talk to as such he father or hacker, driver;
        //exp

    const systemMessage={
        role:"system",
        content:"as a begginer in programing"
    }
    let apiMessages=chatMessages.map((messageObject)=>{
      let role="";
      (messageObject.sender==="ChatGPT") ? role="assistant" : role='user';
      return {role:role,content:messageObject.message}
    })

    const apiRequestBody = {
      "model": 'gpt-3.5-turbo',
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          "Authorization": 'Bearer ' + Api_key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });
  
      const data = await response.json();
      // console.log(data.choices[0].message.content);

      //ready to consume in browser
      setMessages([...chatMessages,
      {message:data.choices[0].message.content,sender:'ChatGPT'}])
      setTyping(false);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='app'>
      <div style={{ position: "relative", height: '700px', width: '800px' }}>
        <MainContainer>
        <ChatContainer>
            <MessageList
            scrollBehavior='smooth'
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
