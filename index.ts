import { v4 as uuidv4 } from 'uuid'
//Define a Type to describe an InventoryItem
type InventoryItem = {
    id: string,
    name: string,
    description: string,
    value: number
}

type fightingStyle = 'ranged' | 'melee'
//Define a Type to describe a RPGCharacter 
type RPGCharacter = {
    id: string,
    name: string,
    archtype: string,
    fightingStyle:  fightingStyle
    inventory: InventoryItem[]    
}

interface Armor extends InventoryItem {
    defense?: number
}

interface Weapon extends InventoryItem  {
    damage?: number
}

function createCharacter(name: string, archtype: string, fightingStyle: fightingStyle, inventory: InventoryItem[]):RPGCharacter{
   return{
    id : uuidv4(),
    name,
    archtype,
    fightingStyle,
    inventory: []
   } 

}

function createInventoryItem(name: string, description: string, value: number, damage?: number, defense?: number): InventoryItem & Armor | Weapon{
    return{
        id : uuidv4(),
        name,
        description,
        value,
        defense,
        damage
    }    
}

function addInventoryItem(character: RPGCharacter, item: InventoryItem):void {
    character.inventory.push(item)
}

function removeInventoryItem(character: RPGCharacter, itemID: string):void{
    character.inventory = character.inventory.filter(item => item.id != itemID)
}

function printInventory(character: RPGCharacter ):void {
    character.inventory.forEach(item => {
        console.log(`${item.name}`)
    })
}

function inventoryValue(character: RPGCharacter):number {
    let total = 0
    character.inventory.forEach(item => {
        total += item.value
    })
    return total
}

const character = createCharacter('Raul', 'Archer', 'ranged', [])

console.log(character)

const sword = createInventoryItem('Sword','Iron sword with leather grip', 40, 50, undefined)
const club = createInventoryItem('Club','Wooden Club', 20, 25, undefined )
const bow = createInventoryItem('Bow','Wooden Bow', 30, 40, undefined)

// console.log(sword, club, bow)


addInventoryItem(character, sword)
addInventoryItem(character, club)
addInventoryItem(character, bow)

console.log(character.inventory, 'before del')


removeInventoryItem(character, club.id)

console.log(character.inventory, 'after del')

console.log(inventoryValue(character))

printInventory(character)