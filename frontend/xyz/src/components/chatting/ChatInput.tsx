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
    <div className="flex">
      <input
        type="text"
        value={chatInput}
        onChange={onChangeChatInput}
        className="bg-amber-100 w-full py-3"
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
