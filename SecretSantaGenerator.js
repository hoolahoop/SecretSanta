/*
This function will pick people to be secret santas for other people. It will 
go through all of the people on the secret santa list and pick names for each of
them.

My first thought was to pick a random person from the list of people for every
person. Then, if the secret person was a suitable pick, they would be kicked
off the list of choices, and the generator would move onto the next person. If
the secret person was unsuitable (due to whatever rules may be in place) it would
run the generator again for the same person over and over until it found a
suitable pick.

My second method is to create a list for every person that has suitable names. 
This way the rules of who is suitable can be defined outside of the name 
generator, thus providing clarity to my code. A problem that I foresee with 
this method is that everytime someone is picked, that name gets taken off of 
the list of suitable people. This means that suitability generation must take 
place during the name picker loop. Therefore, I need to create a new function
for this to happen properly.
*/

function GenerateSantas(){
	var Santas = [];
	Santas.push(new SecretSanta("Jeremy"));
	Santas.push(new SecretSanta("Sebastien"));
	Santas.push(new SecretSanta("Rob"));
	Santas.push(new SecretSanta("Karen"));
	Santas.push(new SecretSanta("Jamelle"));
	//Santas.push(new SecretSanta("Justin"));
	
	var unsuitableChecker = true;
	
	Santas[0].addUnsuitableName(Santas[1]);
	Santas[0].addUnsuitableName(Santas[2]);
	Santas[1].addUnsuitableName(Santas[0]);
	Santas[1].addUnsuitableName(Santas[2]);
	Santas[2].addUnsuitableName(Santas[0]);
	//Santas[2].addUnsuitableName(Santas[1]);
	Santas[3].addUnsuitableName(Santas[4]);
	Santas[4].addUnsuitableName(Santas[3]);

	unsuitableChecker = CheckUnsuitable(Santas, Santas[1], Santas[2]);
	
	//Santas[0].addUnsuitableName(Santas[1]);
	//Santas[2].addUnsuitableName(Santas[1]);
	//Santas[3].addUnsuitableName(Santas[0]);
	
	var AvailableNames = [];
	for (var i = 0; i < Santas.length; i++) {
		AvailableNames.push(Santas[i].getSantaName());
	}
	
	for (var i = 0; i < Santas.length; i++) {
		var SecretPossibilities = SuitabilityPicker(AvailableNames, Santas[i]);
		//console.log("Possibilities - " + SecretPossibilities);
		var rand = 0;
		var makeRandom = true;
		/*Below is an if statement which modifies the randomness of the last 2 results. If 
		the last secret santa is within the possibilities of suitable names, then that 
		persons name must be chosen for the second last person, otherwise the last 
		person will get themself. 
		*/
		if (i == Santas.length - 2) {
			if (Santas[Santas.length - 1].getSantaName() == SecretPossibilities[0]) {
				rand = 0;
				makeRandom = false;
			}
			if (Santas[Santas.length - 1].getSantaName() == SecretPossibilities[1]) {
				rand = 1;
				makeRandom = false;
			}
		}
		if(makeRandom) rand = Math.floor(Math.random() * (SecretPossibilities.length));
		Santas[i].updateSecretName(SecretPossibilities[rand]);
		//console.log(Santas[i].getSantaName() + " -> " + Santas[i].getSecretName());
		/*var addSanta = false;
		for (var j = 0; j < AvailableNames.length; j++) {
			if (AvailableNames[j] == Santas[i].getSantaName()) addSanta = true;
		}
		AvailableNames = SecretPossibilities;
		AvailableNames.splice(rand, 1);
		if (addSanta) AvailableNames.push(Santas[i].getSantaName());*/
		//console.log(AvailableNames);
		var removeIndex = 0;
		for (var j = 0; j < AvailableNames.length; j++) {
			if(Santas[i].getSecretName() == AvailableNames[j]) removeIndex = j;
		}
		AvailableNames.splice(removeIndex, 1);
		//console.log(AvailableNames);
	}
}

/*
This function will create and return a list of suitable names.
*/
function SuitabilityPicker(availableNames, santa){
	var SuitableNames = [];
	for (var i = 0; i < availableNames.length; i++) {
		var addName = true;
		var unsuitedNames = santa.getUnsuitableNames();
		if (availableNames[i] == santa.getSantaName()) {
			addName = false;
		}
		for(var j = 0; j < unsuitedNames.length; j++){
			if(availableNames[i] == unsuitedNames[j]) addName = false;
		}
		if(addName) SuitableNames.push(availableNames[i]);
	}
	return SuitableNames;
}

/*
This function will check a secret santa in the list and see if they are taken by someone.
If one person has to have this person, they are taken. If two people have to have two
people, they are taken. Returns true if taken, false if not taken.

I realized that this function is not necessary, because if the suitability picker function
returns an array of one, that is the same thing as being already chosen.
*/
function AlreadyChosen(){
	
}

/*
This function will check to see if adding an unsuitable name to a santa is allowed. If it
is allowed it will add it and return true, if not it will return false.
*/
function CheckUnsuitable(santas, santa, unsuitableSanta){
	if(CreateUniqueSuitableList(santas, santa)){
		console.log("We did it!");
	}else{
		console.log("We didn't do it!");
	}
	santa.addUnsuitableName(unsuitableSanta);
}

/*
I need a function to create a unique suitable person list for any santa. Using this function
will allow unsuitable santas to be added to other santas.
*/
function CreateUniqueSuitableList(santas, santa){
	var totalSantas = santas.length;
	var uniqueSuitables = new Array(totalSantas);
	for(var i = 0; i < totalSantas; i++){
		uniqueSuitables[i] = [];
		//console.log("i = " + i);
		//console.log("Unsuitable List: " + santas[i].getUnsuitableNames());
		//var totalSuitables = totalSantas - santas[i].getUnsuitableNames().length - 1; //santas - unsuitables - this santa
		for(var j = 0; j < totalSantas; j++){
			//console.log("j = " + j);
			var addSanta = true;
			if(i != j){
				for(var k = 0; k < santas[i].getUnsuitableNames().length; k++){
					if(santas[j].getSantaName() == santas[i].getUnsuitableNames()[k]){
						addSanta = false;
					}
				}
				if(i != 0 && addSanta){
					for(var k = 0; k < i; k++){
						for(var l = 0; l < uniqueSuitables[k].length; l++){
							if(santas[j].getSantaName() == uniqueSuitables[k][l]){
								addSanta = false;
							}
						}
					}
				}
			}else{
				addSanta = false;
			}
			if(addSanta){
				uniqueSuitables[i].push(santas[j].getSantaName());
				//console.log("i = " + i + " j = " + j);
				console.log("First UniqueSuitables: "  + uniqueSuitables);
			}
			if(j == totalSantas - 1 && uniqueSuitables[i].length == 0){
				addSanta = true;
				var stealSanta = []; 
				for(var k = 0; k < i; k++){
					if(uniqueSuitables[k].length > 1){
						for(var l = 0; l < uniqueSuitables[k].length; l++){
							if(stealSanta.length == 0){
								if(uniqueSuitables[k][l] != santas[i].getSantaName()){
									for(var m = 0; m < santas[i].getUnsuitableNames().length; m++){
										if(uniqueSuitables[k][l] == santas[i].getUnsuitableNames()[m]){
											addSanta = false;
										}
									}
								}
								else{
									addSanta = false;
								}
								if(addSanta){
									stealSanta[0] = uniqueSuitables[k][l];
									stealSanta[1] = k;
									stealSanta[2] = l;
								}
							}
						}
						if(stealSanta.length != 0){
							k = totalSantas;
						}
					}
				}
				if(stealSanta.length != 0){
					uniqueSuitables[stealSanta[1]].splice(stealSanta[2], 1);
					uniqueSuitables[i].push(stealSanta[0]);
				}else{
					return false;
				}
				console.log("Steal UniqueSuitables: " + uniqueSuitables);
			}
		}
	}
	return true;
}

GenerateSantas();


