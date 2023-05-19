import abna from './abna'
import blurbobb from './blurbobb'
import gazette from './gazette'
import manticore95 from './manticore95'
import schifty from './schifty'
import veneneux from './veneneux'
import vana from './vana'
import fatcat from './fatcat'
import vaporwave from './vaporwave'
//import void from './void';
import chimera from './chimera'
import walter from './walter'
import castles from './castles'

interface Modes {
    [mode: string]: Function
}

const modes: Modes = {
    abna,
    blurbobb,
    gazette,
    manticore95,
    schifty,
    veneneux,
    vana,
    fatcat,
    vaporwave,
    // void,
    chimera,
    walter,
    castles,
}

export default modes
