class Level {
    constructor(number, given, sol) {
        this.solved = false;
        this.numHints = 0;
        this.numAttempts = 0;
        this.levelNumber = number;
        this.solution = sol;

        for(var i = 1; i <= 9; i++) {
            document.getElementById("a" + i).disabled = false;
            document.getElementById("a" + i + "s").disabled = false;

            document.getElementById("b" + i).disabled = false;
            document.getElementById("b" + i + "s").disabled = false;

            document.getElementById("c" + i).disabled = false;
            document.getElementById("c" + i + "s").disabled = false;

            document.getElementById("d" + i).disabled = false;
            document.getElementById("d" + i + "s").disabled = false;

            document.getElementById("e" + i).disabled = false;
            document.getElementById("e" + i + "s").disabled = false;

            document.getElementById("f" + i).disabled = false;
            document.getElementById("f" + i + "s").disabled = false;

            document.getElementById("g" + i).disabled = false;
            document.getElementById("g" + i + "s").disabled = false;

            document.getElementById("i" + i).disabled = false;
            document.getElementById("i" + i + "s").disabled = false;

            document.getElementById("j" + i).disabled = false;
            document.getElementById("j" + i + "s").disabled = false;

            document.getElementById("a" + i).value = "";
            document.getElementById("a" + i + "s").value = "";

            document.getElementById("b" + i).value = "";
            document.getElementById("b" + i + "s").value = "";

            document.getElementById("c" + i).value = "";
            document.getElementById("c" + i + "s").value = "";

            document.getElementById("d" + i).value = "";
            document.getElementById("d" + i + "s").value = "";

            document.getElementById("e" + i).value = "";
            document.getElementById("e" + i + "s").value = "";

            document.getElementById("f" + i).value = "";
            document.getElementById("f" + i + "s").value = "";

            document.getElementById("g" + i).value = "";
            document.getElementById("g" + i + "s").value = "";

            document.getElementById("i" + i).value = "";
            document.getElementById("i" + i + "s").value = "";

            document.getElementById("j" + i).value = "";
            document.getElementById("j" + i + "s").value = "";
        }

        document.getElementById("ll").innerText = "LEVEL " + number;
        document.getElementById("message").disabled = true;
        document.getElementById("nextlevel").disabled = true;

        for(var i = 1; i <= 9; i++) {
            document.getElementById(i + "_count").disabled = true;
            document.getElementById(i + "_count").value = "";
        }

        this.initializeSquares(given);
        this.updateChicken(); //Fill in the chicken with what's input already
    }

    changeMessage(change) {
        if(change == "Saved" && document.getElementById("message").value.substr(0,5) == "Saved") {
            document.getElementById("message").value = document.getElementById("message").value + " (x2)";
        } else {
            document.getElementById("message").value = change;
        }
    }

    initializeSquares(given) {
        if(given == "Fill") return;
        var letters = ["a", "b", "c", "d", "e", 'f', 'g', 'i', 'j'];
        for(var i = 0; i < 9; i++) {
            var currBlock = given[i];
            var letter = letters[i];
            for(var j = 1; j <= 9; j++) {
                if(currBlock[j-1] != 0) {
                    document.getElementById(letter + j).value = currBlock[j-1];
                    document.getElementById(letter + j).disabled = true;
                }
            }
        }
    }

    //FIX
    checkBoard() {
        let names = [["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"],
                     ["a4", "a5", "a6", "b4", "b5", "b6", "c4", "c5", "c6"],
                     ["a7", "a8", "a9", "b7", "b8", "b9", "c7", "c8", "c9"],
                     ["d1", "d2", "d3", "e1", "e2", "e3", "f1", "f2", "f3"],
                     ["d4", "d5", "d6", "e4", "e5", "e6", "f4", "f5", "f6"],
                     ["d7", "d8", "d9", "e7", "e8", "e9", "f7", "f8", "f9"],
                     ["g1", "g2", "g3", "i1", "i2", "i3", "j1", "j2", "j3"],
                     ["g4", "g5", "g6", "i4", "i5", "i6", "j4", "j5", "j6"],
                     ["g7", "g8", "g9", "i7", "i8", "i9", "j7", "j8", "j9"]];
        this.numAttempts += 1;
        this.solved = true;
        for(var i = 0; i < 9; i++) {
            for(var j = 1; j <= 9; j++) {
                var entry = document.getElementById(names[i][j-1]).value;
                if(entry == "") {this.solved = false; continue;}
                var comp = -1;
                comp = parseInt(entry);
                if(this.solution[i][j-1] == comp) {
                    document.getElementById(names[i][j-1]).disabled = true;
                } else {
                    this.solved = false;
                }
            }
        }
        if(this.solved) {
            this.changeMessage(this.randomSuccess());
            document.getElementById("nextlevel").disabled = false;
        } else {
            this.changeMessage("Not Quite... that's attempt #" + this.numAttempts);
        }
        this.updateChicken();
    }

    randomSuccess() {
        var choose = Math.floor(Math.random() * 5);
        switch(choose) {
            case 0:
                return "You're amazing!!!";
            case 1:
                return "You make your whole family proud!";
            case 2:
                return "The true Sudoku master.";
            case 3:
                return "All of your favorite things are bestowed upon you.";
            case 4:
                return "[Insert cool success message here]";
            default:
                return "Passed";
        }
    }

    stock() {
        var tallies = [0,0,0,0,0,0,0,0,0];
        var letters = ["a", "b", "c", "d", "e", 'f', 'g', 'i', 'j'];
        for(var i = 0; i < 9; i++) {
            var letter = letters[i];
            for(var j = 1; j<=9; j++) {
                var entry = document.getElementById(letter + j).value;
                if(entry == "") continue;
                var val = parseInt(entry);
                if(entry == NaN) continue;
                tallies[val - 1] += 1;
            }
        }

        var max = 0;
        var index = 0;
        for(var i = 1; i <= 9; i++) {
            document.getElementById(i + "_count").value = tallies[i - 1];
            if(tallies[i-1] < 9  && tallies[i-1] > max) {
                max = tallies[i-1];
                index = i-1;
            }
        }
        if(max == 0) {
            this.changeMessage("You have 9 of everything just hit the button.");
            return;
        }
        this.changeMessage("Looks like you have the most " + (index + 1) + "s. Start from there.");
    }

    clear() {
        var letters = ["a", "b", "c", "d", "e", 'f', 'g', 'i', 'j'];
        for(var i = 0; i < 9; i++) {
            var letter = letters[i];
            for(var j = 1; j <= 9; j++) {
                if(document.getElementById(letter + j).disabled == false) {
                    document.getElementById(letter + j).value = "";
                }
            }
        }
        this.changeMessage("Your many errors (or correct answers maybe) have been erased.")
    }

    //FIX
    getHint() {
        let names = [["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"],
                     ["a4", "a5", "a6", "b4", "b5", "b6", "c4", "c5", "c6"],
                     ["a7", "a8", "a9", "b7", "b8", "b9", "c7", "c8", "c9"],
                     ["d1", "d2", "d3", "e1", "e2", "e3", "f1", "f2", "f3"],
                     ["d4", "d5", "d6", "e4", "e5", "e6", "f4", "f5", "f6"],
                     ["d7", "d8", "d9", "e7", "e8", "e9", "f7", "f8", "f9"],
                     ["g1", "g2", "g3", "i1", "i2", "i3", "j1", "j2", "j3"],
                     ["g4", "g5", "g6", "i4", "i5", "i6", "j4", "j5", "j6"],
                     ["g7", "g8", "g9", "i7", "i8", "i9", "j7", "j8", "j9"]];
        var valid = false;
        while(!valid) {
            var row = Math.floor(Math.random() * 9);
            var col = Math.floor(Math.random() * 9);
            var obj = document.getElementById(names[row][col]);
            if(obj.value == "") {
                obj.value = this.solution[row][col];
                obj.disabled = true;
                valid = true;
            }
            if(this.noBlank()) { this.changeMessage("Why are you asking for a hint? Just submit."); return;}
        }
        this.numHints += 1;

        var mess = "You have used " + this.numHints + " hint";
        if(this.numHints != 1) {
            mess += "s";
        }
        this.changeMessage(mess + "; that's kinda sad.");
    }

    noBlank() {
        var letters = ["a", "b", "c", "d", "e", 'f', 'g', 'i', 'j'];
        for(var j = 1; j <= 9; j++) {
            for(var i = 0; i < 9; i++) {
                if(document.getElementById(letters[i] + j).value == "") {
                    return false;
                }
            }
        }
        return true;
    }

    updateChicken() {
        var letters = ["a", "b", "c", "d", "e", 'f', 'g', 'i', 'j'];
        for(var i = 0; i < 9; i++) {
            var letter = letters[i];
            for(var j = 1; j <= 9; j++) {
                var realEntry = document.getElementById(letter + j).value;
                var fakeObj = document.getElementById(letter + j + "s");
                if(realEntry != "") {
                    fakeObj.value = realEntry;
                    fakeObj.disabled = true;
                } else if(realEntry == "" && fakeObj.value == "" || fakeObj.disabled) {
                    fakeObj.value = "";
                    fakeObj.disabled = false;
                }
            }
        }
    }
}

function refreshPressed() {
    currLevel.updateChicken();
}

function submitPressed() {
    currLevel.checkBoard();
}

function nextLevelPressed() {
    if(currLevel.solved) {
        loadNextLevel(); //DO THIS METHOD!!
    } else {
        currLevel.changeMessage("Nice try.");
    }
}

function loadNextLevel() {
    currLevel = getFileInfo("" + (currLevel.levelNumber + 1));
}

function savePressed() {
    var letters = ["a", "b", "c", "d", "e", 'f', 'g', 'i', 'j'];
    var obj = {
        nums:[],
        scratch_nums:[],
        locked:[],
        scratched_lock:[],
        l_num : currLevel.levelNumber,
        l_sol : currLevel.solution,
        is_solved : currLevel.solved,
        n_hints : currLevel.numHints,
        n_atts : currLevel.numAttempts //just remember abt next level
    };
    for(var i = 0; i < 9; i++) {
        var letter = letters[i];
        for(var j = 1; j <= 9; j++) {
            let entr = letter + j;
            let entr2 = letter + j + "s";
            obj.nums.push(document.getElementById(entr).value);
            obj.locked.push(document.getElementById(entr).disabled);
            obj.scratch_nums.push(document.getElementById(entr2).value);
            obj.scratched_lock.push(document.getElementById(entr2).disabled);
        }
    }

    localStorage.setItem("sudoku_save", JSON.stringify(obj));
    currLevel.changeMessage("Saved");
}

function stockPressed() {
    currLevel.stock();
}

function clearPressed() {
    currLevel.clear();
}

function hintPressed() {
    currLevel.getHint();
}

function loadPressed() {
    let obj = JSON.parse(localStorage.getItem("sudoku_save"));
    currLevel = new Level(obj.l_num, "Fill", obj.l_sol);
    currLevel.solved = obj.is_solved;
    currLevel.numHints = obj.n_hints;
    currLevel.numAttempts = obj.n_atts;
    let letters = ["a", "b", "c", "d", "e", 'f', 'g', 'i', 'j'];
    for(var i = 0; i < 9; i++) {
        let letter = letters[i];
        for(var j = 1; j <= 9; j++) {
            let k1 = document.getElementById(letter + j);
            let k2 = document.getElementById(letter + j + "s");
            let pos = (9 * i) + (j - 1);
            k1.value = obj.nums[pos];
            k1.disabled = obj.locked[pos];
            k2.value = obj.scratch_nums[pos];
            k2.disabled = obj.scratched_lock[pos]; 
        }
    }
    document.getElementById("ll").innerText = "LEVEL " + currLevel.levelNumber;
    document.getElementById("message").disabled = true;
    document.getElementById("message").value = "Loaded.";
    document.getElementById("nextlevel").disabled = !currLevel.solved;
}

function skipPressed() {
    currLevel = getFileInfo(document.getElementById("skip2").value);
}

function getFileInfo(num) {
    let MAX_LVL = 105;
    document.getElementById("label4skip2").innerText = "Skip to (86-" + MAX_LVL + "):";
    if(num < 86 || num > MAX_LVL) {
        if(num == MAX_LVL + 1) document.getElementById("message").value = "No more levels at this time!";
        else document.getElementById("message").value = "Invalid level.";
        return currLevel;
    }
    var names = JSON.parse(`{
        "a86": "000420076::700506800::000000000::560810700::300000005::001053089::000000000::002608001::840035000",
        "b86": "351724968::428596317::976813524::562389471::819247653::743165289::137952846::294678135::685431792",
        "a87": "007040006::001600400::068000035::503620000::000000000::000094301::430000750::009005300::800010600",
        "b87": "297531468::345682179::186497235::513924786::628173594::974856321::431269857::862745913::759318642",
        "a88": "000000068::031000090::600087020::500001029::300000008::910200006::050410003::070000120::840000000",
        "b88": "742831659::935246187::168597423::574362918::681759234::329418576::256973841::417685392::893124765",
        "a89": "050009200::000700930::300100000::040700980::500000007::071004050::000003002::024008000::009400080",
        "b89": "154286397::639745128::278931645::346592871::725813964::981467253::867124539::593678412::412359786",
        "a90": "091300580::000000009::008410000::200009000::400806005::000500003::000028900::700000000::031004680",
        "b90": "791264358::362587419::584319762::253471896::419836527::876925143::645798231::128653974::937142685",
        "a91": "060003700::000004010::002100500::030000140::021000830::049000050::009004600::070900000::003800020",
        "b91": "461358792::523794186::798216534::837521649::952647318::146839257::289175463::314962875::675483921",
        "a92": "050007120::300000000::020905000::001000500::500284001::007000600::000309070::000000008::068700030",
        "b92": "954317826::837642915::126895473::241569387::763284591::598731642::415973268::389126754::672458139",
        "a93": "010407500::480000902::000000007::050009103::000805000::409300080::900000000::603000074::004706090",
        "b93": "216487935::497536218::538912647::852361479::749825361::163749582::971653824::324198756::685274193",
        "a94": "705430000::000007000::260000003::002000003::060394080::300000600::200000014::000800000::000016509",
        "b94": "795138264::436927185::128456973::982765341::671394852::543281697::267519438::359842716::814673529",
        "a95": "006000018::000160900::001000370::000052004::030000090::100840000::085000700::001054000::420000500",
        "b95": "476283951::593167284::218945376::867432195::952716843::134598762::685371429::329854617::741629538",
        "a96": "000009420::000040807::000805630::100000074::080000060::940000008::061307000::504090000::097200000",
        "b96": "618935472::739246815::425817639::156782943::283459761::974361528::861524397::347198256::592673184",
        "a97": "800002030::003050410::200063000::001000405::000000000::809000100::000340009::035060700::090500002",
        "b97": "894673251::172958463::536412978::761524839::923186745::485397126::217835694::348269517::659741382",
        "a98": "000005640::100060000::008030500::030004200::085701340::004900010::007020900::000070002::042800000",
        "b98": "793154268::815267439::642938571::139685724::564721983::278349615::357896142::421573896::986412357",
        "a99": "000002410::001005080::020600000::084906020::020000070::010502490::000001040::010200300::043900000",
        "b99": "365791824::892435671::417682359::584923716::976148532::123576498::659817243::731264985::248359167",
        "a100":"000605020::000200090::000040810::000000046::008704500::920000000::032090000::010007000::090502000",
        "b100":"971843256::685271349::423695817::357168924::219734685::846529173::532416798::194387562::768952431",
        "a101":"090065700::500000000::000809000::050040007::010278090::600030080::000901000::000000004::007540020",
        "b101":"492581763::365742819::718369254::859413672::146278935::237695481::584126397::921837546::673954128",
        "a102":"048600050::000400000::900702000::100002000::340508029::000600008::000906007::000002000::050004890",
        "b102":"748231965::691485732::253697481::189346527::372518649::465729318::814973256::936852174::527164893",
        "a103":"000032070::400071009::700004000::300060000::058000240::000040001::000500003::700890004::080630000",
        "b103":"196485723::832671954::475329816::347158269::261937548::958246371::629713485::514892637::783564192",
        "a104":"000000471::000640000::000005063::700008905::050907030::106500008::290600000::000098000::481000000",
        "b104":"356719842::829643715::471582963::732854196::168927534::945136278::297365481::614298357::583471629",
        "a105":"540030000::000096500::900020007::100360000::930000017::000072003::400090008::008370000::000050034",
        "b105":"547823916::831796425::926541387::175932648::369485172::284617593::413258769::692374851::758169234"
      }`)
    var given = new Array(9);
    var solution = new Array(9);
    var line1 = names["a" + num];
    var line2 = names["b" + num];
    // var line1 = "000420076::700506800::000000000::560810700::300000005::001053089::000000000::002608001::840035000"; //screw sep file just hardcode..
    // var line2 = "351724968::428596317::976813524::562389471::819247653::743165289::137952846::294678135::685431792";
    var givenLines = line1.split("::");
    var solLines = line2.split("::");
    for(var i = 0; i < 9; i++) {
        given[i] = breakString(givenLines[i]);
        solution[i] = breakString(solLines[i]);
    }

    function breakString(str) {
        var tbr = new Array(9);
        for(var i =0; i < 9; i++) {
            tbr[i] = parseInt(str.substring(i,i+1));
        }
        return tbr;
    }
    document.getElementById("message").value = "Skipped to level " + num;
    return new Level(parseInt(num), given, solution);
}