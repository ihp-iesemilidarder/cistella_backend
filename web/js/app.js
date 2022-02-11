import { BackOffice } from './BackOffice.js';
import {FrontOffice} from './FrontOffice.js';
const main=async()=>{
    await FrontOffice();
    await BackOffice();
}
main();