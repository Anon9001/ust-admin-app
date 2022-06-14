import { LCDClient, MsgExecuteContract, Fee } from "@terra-money/terra.js";
import {CONTRACT_ADDR, URL, CHAIN_ID} from "./config";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const until = Date.now() + 1000 * 60 * 60;
const untilInterval = Date.now() + 1000 * 60;

const msgAddSeveralVictims = (victims) => {
    return {
        victim_entry: {
            victims: victims
        }
    };
}

const msgTransferOwnership = (address) => {
    return { transfer_ownership: {address}};
}

const msgRaffleVersion = (new_raffle_value) => {
    return { set_raffle_state: {new_raffle_value}};
}

const _exec = (msg, fee = new Fee(200000, { uluna: 30000 })) => async (wallet) => {
    const lcd = new LCDClient({
        URL: URL,
        chainID: CHAIN_ID,
    });

    const { result } = await wallet.post({
        fee,
        msgs: [
            new MsgExecuteContract(
                wallet.walletAddress,
                CONTRACT_ADDR,
                msg
            ),
        ],
    });

    while (true) {
        try {
            return await lcd.tx.txInfo(result.txhash);
        } catch (e) {
            if (Date.now() < untilInterval) {
                await sleep(500);
            } else if (Date.now() < until) {
                await sleep(1000 * 10);
            } else {
                throw new Error(
                    `Transaction queued. To verify the status, please check the transaction hash: ${result.txhash}`
                );
            }
        }
    }
};

export const execAddSeveralVictims = async (wallet,victims) => _exec(msgAddSeveralVictims(victims))(wallet);
export const execTransfertOwnership = async (wallet,address) => _exec(msgTransferOwnership(address))(wallet);
export const execRaffleVersion = async (wallet,new_raffle_value) => _exec(msgRaffleVersion(new_raffle_value))(wallet);