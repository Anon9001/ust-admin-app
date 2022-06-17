import {LCDClient} from "@terra-money/terra.js";
import {CONTRACT_ADDR, CHAIN_ID, URL} from "./config";

const msgGetAllVictims = () => {
    return { get_victim_data: {} };
}

const msgGetRaffleState = () => {
    return { get_raffle_state: {} };
}

const msgGetOwnerAddress = () => {
    return { get_owner_addr: {} };
}

const query = async (message) => {
    const lcd = new LCDClient({
        URL: URL,
        chainID: CHAIN_ID,
    })
    return lcd.wasm.contractQuery(CONTRACT_ADDR, message)
}

export const getAllVictims = async () => {
    return query(msgGetAllVictims())
}

export const getRaffleState = async () => {
    return query(msgGetRaffleState())
}

export const getOwnerAddress = async () => {
    return query(msgGetOwnerAddress())
}
