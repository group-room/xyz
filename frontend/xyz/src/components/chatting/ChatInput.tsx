import React from "react";

interface ChatInputProps {
  chatInput: string;
  onChangeChatInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSumbitChat: () => void;
}

function ChatInput({
  chatInput,
  onChangeChatInput,
  handleSumbitChat,
}: ChatInputProps) {
  return (
    <div className="flex border-t border-black fixed bottom-0 w-full -ml-5">
      <input
        type="text"
        value={chatInput}
        onChange={onChangeChatInput}
        className="bg-amber-100 w-full px-2 py-3 border-r border-black"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSumbitChat();
          }
        }}
      />
      <button
        className="flex-none py-1 px-2 bg-yellow"
        onClick={handleSumbitChat}
      >
        보내기
      </button>
    </div>
  );
}

export default ChatInput;
