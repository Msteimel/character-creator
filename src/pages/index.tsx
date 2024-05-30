import Image from "next/image";
// import { useSpells } from "@/hooks/useSpells";
import { useSpells } from "../context/SpellsContext";
import { useClasses } from "../context/ClassesContext";

import CharacterCreator from "@/components/CharacterCreator/CharacterCreator";

export default function Home() {
  // const spells = useSpells();
  const classes = useClasses();

  console.log(classes);

  return (
    <>
      <CharacterCreator />
    </>
  );
}
