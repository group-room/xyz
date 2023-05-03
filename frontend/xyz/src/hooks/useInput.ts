import { useCallback, useState } from "react";

type useInputProps = [
  string,
  (e: { target: { value: React.SetStateAction<string> } }) => void,
  () => void
];

function useInput(initialData: string): useInputProps {
  const [value, setValue] = useState(initialData);

  const handler = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setValue(e.target.value);
    },
    []
  );

  // 제출 후 input 초기화
  const reset = useCallback(() => {
    setValue("");
  }, []);

  return [value, handler, reset];
}

export default useInput;
