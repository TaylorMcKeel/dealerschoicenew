import axios from 'axios' //use require on the server and import on the client
const pokeDiv = document.querySelector('#pokemon')
const trainDiv = document.querySelector('#trainors')


const render = async()=>{
    try{const pokemon = (await axios.get('/api/pokemon')).data
    const trainors = (await axios.get('/api/trainors'))
    const curr = window.location.hash.slice(1) * 1
    const poke = `
        ${pokemon.map(card=>{
            const train = trainors.filter((item)=>{item.id === card.trainorId})
            return `<li class='mainCard'>
            <a href='/pokemon/#${card.id}'><h3>${card.name}</h3></a>
                ${curr === card.id ? `
                    <ul>
                        <li>Health: ${card.health}</li>
                        <li>Type: ${card.type}</li>
                        <li>Trainor: <a href='/'>${train.name}</a></li>
                    </ul>
                ` :''}
            </li>`
        }).join('')}
    `
    const train = `
        ${trainors.map(card=>{
            const poke = pokemon.filter((item)=>{card.id === item.trainorId})
            const friend = trainors.filter((item)=>{card.id === item.friendId})
            return `<li class='mainCard'>
            <a href='/trainors/#${card.id}'><h3>${card.name}</h3></a>
                ${curr === card.id ? `
                    <ul>
                        <li>Hometown: ${card.hometown}</li>
                        <li>Best Friend: ${friend.name}</li>
                        <li>Pokemon: ${poke.map(item=>{
                            return `
                            <a href='/'>${item.name}</a>
                            `
                        })}</li>
                    </ul>
                ` :''}
            </li>`
        }).join('')}
`
    pokeDiv.innerHTML = poke
    trainDiv.innerHTML= train}catch(ex){
        console.log(ex)
    }
}

render()

