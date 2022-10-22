import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import { Repo } from '../types/repo'
import { User } from '../types/user'

const Home: NextPage = () => {

  const [data, setData ] = useState<User>()
  const [repos, setRepos] = useState<Repo>()
  const [name, setName] = useState('CrisDeniz')

  const URL = `https://api.github.com/users/${name}`

  async function fetchUser(){
  try {
      const response = await fetch(URL) 
      const data = await response.json()

      
      setData(data)
  } catch (error) {
    console.log(error);
    
  }
}

  async function fetchRepo() {
   try {
    const response = await fetch(URL + "/repos")
    const data = await response.json()

    setRepos(data)

   } catch (error) {
    console.log(error);
    
   }

  }

useEffect(() => {
  fetchUser()
  fetchRepo()
}, [name])

  return (
    <div className={styles.master}>
      <div className={styles.search}>
        <input onKeyUp={(e) => {
          if (e.code === 'Enter') {
            setName(e.currentTarget.value)

          }
        }} type="text" name="name"  placeholder='Digite um nome'/>
      </div>
      {!data &&
        <div className={styles.container} >
          <span style={{textAlign:'center', width: '100%'}}>Carregando...</span>
        </div>
      }
      {data &&
      <div className={styles.container}>
      <div className={styles.disc}>
       {Array.isArray(repos) ?
       <>
          <div className={styles.avatar}>
          <img src={data?.avatar_url} alt="Avatar" />
            <div>
            <span>{data?.name}</span>
            <span>{data?.bio}</span>
            </div>
          </div>
          <div className={styles.info}>
                <div className={styles.topLine}>
                  <div>
                    <span>Followers</span>
                    <span>{data?.followers}</span>
                  </div>
                  <div>
                    <span>Following</span>
                    <span>{data?.following}</span>
                  </div>
                </div>
                <div className={styles.botLine}>
                  <div>
                    <span>Repositories</span>
                    <span>{data?.public_repos}</span>
                  </div>
                </div>
              </div>
            </>
          : null
        }
      </div>
     
      <div className={styles.repositories}>
        {data && Array.isArray(repos) ?
          repos?.map( repo => {
            return (
              <div key={repo.id} className={styles.repoName}>
               <a href={repo.html_url}><span>{repo.name}</span></a>
               <span>{repo.description}</span>
              </div>
            )
          })
          : data && Array.isArray(repos) === false ? <span>Não foi encontrado...</span>
          : null
        }
      </div>
    </div>  
      }
    </div>
  )
}

export default Home
