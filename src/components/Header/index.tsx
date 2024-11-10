import React, { useState } from "react";
import { FilmReel, FilmScript, SignOut } from "@phosphor-icons/react";
import { Category, DivSignOut, Headers } from "./styles";
import icon from "../../assets/icon.png";
import { SearchInput } from "../SearchInput";
import { getAuth, signOut } from "firebase/auth"; // Importe o signOut do Firebase

interface HeaderProps {
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
  searchTerm: string;
}

export function Header({
  onCategoryChange,
  onSearchChange,
  searchTerm,
}: HeaderProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Filmes");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const handleSignOut = () => {
    const auth = getAuth(); // Obtenha a instância de autenticação do Firebase
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user"); // Remove o dado do usuário do localStorage
        window.location.href = "/Auth"; // Redireciona para a página de autenticação
      })
      .catch((error) => {
        console.error("Erro ao fazer sign out:", error);
      });
  };

  return (
    <Headers>
      <img src={icon} alt="Ícone" />
      <Category>
        <div
          onClick={() => handleCategoryChange("Filmes")}
          className={activeCategory === "Filmes" ? "active" : ""}
        >
          <FilmReel size={32} weight="fill" />
          <h2>Filmes</h2>
        </div>
        <div
          onClick={() => handleCategoryChange("Series")}
          className={activeCategory === "Series" ? "active" : ""}
        >
          <FilmScript size={32} weight="fill" />
          <h2>Series</h2>
        </div>
      </Category>
      <DivSignOut>
        <SignOut size={30} onClick={handleSignOut} />
      </DivSignOut>
      <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </Headers>
  );
}
