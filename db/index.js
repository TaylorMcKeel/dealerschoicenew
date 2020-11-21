const Sequelize = require('sequelize')
const {STRING, INTEGER} = Sequelize

const conn = new Sequelize('postgres://localhost/pokemon')

const Pokemon = conn.define('pokemon',{
    name: STRING,
    health: INTEGER,
    type: STRING,
})

const Trainor = conn.define('trainor',{
    name: STRING,
    hometown: STRING
})

Pokemon.belongsTo(Trainor)
Trainor.belongsTo(Trainor,{foreignKey: 'friendId'})
Trainor.hasMany(Pokemon)

const sync=async()=>{
    try{
        await conn.sync({ force: true })
        const squirtle = await Pokemon.create({name: 'Squirtle', health: 200,type: 'Water'})
        const charmander =await Pokemon.create({name: 'Charmander', health: 300,type: 'Fire'})
        const jigglypuff = await Pokemon.create({name: 'Jigglypuff', health: 100,type: 'Normal'})
        const onyx = await Pokemon.create({name: 'Onyx', health: 400,type: 'Rock'})
        const magmar = await Pokemon.create({name: 'Magmar', health: 350,type: 'Fire'})
        const ash = await Trainor.create({name:'Ash', hometown:'Pallet'})
        const misty = await Trainor.create({name:'Misty', hometown:'NYC'})
        const brock = await Trainor.create({name:'Brock', hometown:'Tulum'})
        squirtle.trainorId = ash.id
        charmander.trainorId= ash.id
        jigglypuff.trainorId = misty.id
        onyx.trainorId = brock.id
        magmar.trainorId = ash.id
        ash.friendId = misty.id
        misty.friendId = brock.id
        brock.friendId = ash.id
        await Promise.all([squirtle.save(),charmander.save(),jigglypuff.save(),onyx.save(),magmar.save(),ash.save(),misty.save(),brock.save()])
    }
    catch(ex){
        console.log(ex)
    }

}
module.exports = {sync, Pokemon, Trainor}