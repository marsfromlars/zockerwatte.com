import { isEmpty, EMPTY_STRING as E } from "./module.js";
import MathUtils from "./bigmodule.js"; // default import

document.getElementById( "output" ).innerHTML = "isEmpty: " + isEmpty( E );

document.getElementById( "output" ).innerHTML += "<br>sqrt(PI): " + MathUtils.sqrt( MathUtils.PI );

