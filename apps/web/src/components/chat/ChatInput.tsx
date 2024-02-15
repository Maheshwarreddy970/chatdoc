import { Send } from 'lucide-react'
import { Button,Textarea } from '@repo/ui/ui'
import { useContext, useRef } from 'react'
import { ChatContext } from './ChatContext'

interface ChatInputProps {
  isDisabled?: boolean
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const {
    addMessage,
    handleInputChange,
    isLoading,
    message,
  } = useContext(ChatContext)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className='absolute bottom-0  sm:mt-8 left-0 w-full'>
      <div className='mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className='relative flex h-full flex-1 items-stretch md:flex-col'>
          <div className='relative flex flex-col w-full flex-grow p-4'>
            <div className='relative'>
              <Textarea
                rows={1}
                ref={textareaRef}
                autoFocus
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e:any) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()

                    addMessage()
                    
                    textareaRef.current?.focus()
                  }
                }}
                placeholder='Ask me anything...'
                className='resize-none pr-12 text-base py-3 scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-track-black-lighter scrollbar-w-2 scrolling-touch'
              />

              <Button
                disabled={isLoading || isDisabled}
                className='absolute bottom-1.5 right-[8px]  hover:text-white bg-white hover:bg-black'
                aria-label='send message'
                onClick={() => {
                  addMessage()

                  textareaRef.current?.focus()
                }}>
                <Send size={48} strokeWidth={1.75} className='text-black h-4 w-4 hover:text-white' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput