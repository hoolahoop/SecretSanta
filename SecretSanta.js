/*
The Secret Santa class holds all information about a secret santa
group member. It can return and update all information about 
each secret santa group member. The basic configuration has only 
names, in order to test randomization easily.

The Secret Santa class has been updated to hold 2 names: Santa name
and Secret name. The Santa name is the person's name who is giving
the gift. The Secret name is the person's name who is receiving a
gift from the Santa.

The Secret Santa class has been updated to carry a list of 
unsuitable names. This list will be configurable by the user, so 
that if users want certain rules applied to certain people (such as 
no spouses) they will be able to do so.

Unsuitable names will have to have certain rules. One will be that
the unsuitable name can not be the Santa's name. Another will be 
that unsuitable names must come from the list of other members of
the group. Another is that there must be at least one secret
name available for every santa.
*/
class SecretSanta {
	constructor(name/*, email*/){
		this.SantaName = String(name); //need code for unique secret santa names
		//this.email = String(email);
		this.SecretName = "";
		this.UnsuitableNames = [];
	}
	
	updateSantaName(santaName) {
		this.SantaName = String(santaName);
	}
	getSantaName(){
		return this.SantaName;
	}
	
	updateSecretName(secretName) {
		this.SecretName = String(secretName);
	}
	getSecretName(){
		return this.SecretName;
	}
	
	addUnsuitableName(unsuitableSanta){
		this.UnsuitableNames.push(String(unsuitableSanta.getSantaName()));
	}
	getUnsuitableNames(){
		return this.UnsuitableNames;
	}
	removeUnsuitableName(unsuitableSanta){
		var index = 0;
		for (var i = 0; i < this.UnsuitableNames.length; i++){
			if (this.UnsuitableNames[i] == unsuitableSanta.getSantaName()){
				index = i;
				i = this.UnsuiteableNames.length;
			}
		}
		this.UnsuitableNames.splice(index, 1);
	}
}