'use client';

import { useState } from "react";

import Image from "next/image";
import Header from "./components/Header";
import github from "../public/img/github.png";
import ItemList from "./components/ItemList";

export default function Home() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser: User = await userData.json();

    interface User {
      avatar_url: string;
      name: string;
      bio: string;
      login: string
    }

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }

  }

  return (
    <>
      <Header />
      <div className="conteudo">
        <img src={github.src} className="background" alt="backgroud app" />
        <div className="info">
          <div>
            <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder="@username" />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>

              <div className="perfil">
                <img src={currentUser.avatar_url} className="profile" alt="imagem de perfil"></img>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}



          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map(repo => (
                <ItemList title={repo.name} description={repo.description} />
              ))} 
              
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
