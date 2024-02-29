import { RefObject, SetStateAction, createContext } from "react";

interface SoundContextProps {
  references: Array<{ ref: RefObject<HTMLDivElement>; isMuted: boolean }>;
  setReferences: React.Dispatch<
    SetStateAction<Array<{ ref: RefObject<HTMLDivElement>; isMuted: boolean }>>
  >;
}

export const SoundContext = createContext<SoundContextProps>({
  references: [],
  setReferences: () => {},
});
