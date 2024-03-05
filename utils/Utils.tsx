import { AuthError, OAuthResponse } from '@supabase/supabase-js';
import supabase from './Supabase';

//AUTH FUNCTIONS

//Create a new user account given email and password
export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
}

//Sign in a user account given email and password
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    return error == null ? email : null;
}

//Sign out a user account
export async function signOut() {
    const { error } = await supabase.auth.signOut();
}

//Sign in with Google
export async function signInWithGoogle(): Promise<OAuthResponse['data'] | AuthError> {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            scopes: 'email profile openid'
        }
    });
    return error == null ? data : error;
}

export async function signInWithDiscord(): Promise<OAuthResponse['data'] | AuthError> {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
    });
    return error == null ? data : error;
}

//USER FUNCTIONS

export async function searchUsers(query: string) {
    const { data, error } = await supabase
        .from('users')
        .select('id, name, team_id')
        .like('name', "%" + query.trim() + "%")
        .eq('registered', true);
    console.log(data);
    return data;
}

//Get all user data for a given id
export async function getUser(id: string) {
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id);
    return data == null ? null : data[0];
}

//Register a user given an id, json data, and a name
export async function register(id: string, json: Object) {
    const { error } = await supabase
        .from('users')
        .update({ info: json })
        .eq('id', id);
    setRegistered(id, true);
}

//Set whether or not a user has registered given an id and boolean
export async function setRegistered(id: string, registered: boolean) {
    const { error } = await supabase
        .from('users')
        .update({ registered: registered })
        .eq('id', id);
}

//Set user name given an id and name
export async function setName(id: string, name: string) {
    const { error } = await supabase
        .from('users')
        .update({ name: name })
        .eq('id', id);
}

//TEAM FUNCTIONS

//Get all users
export async function getUsers(){
    const { data, error } = await supabase
    .from('users')
    .select('id, name');
    return data;
}

//Get all teams
export async function getTeams(){
    const { data, error } = await supabase
    .from('teams')
    .select('id, name, description, members, declared');
    return data;
}

//Set user name given an id and name
export async function setUserTeam(id: string, team_id: string) {
    const { error } = await supabase
        .from('users')
        .update({ team_id: team_id })
        .eq('id', id);
}

//Create a new team given a name and description
//Associated user id is automatically added in Supabase for security
async function createTeamLogic(name: string, description: string) {
    const { data, error } = await supabase
        .from('teams')
        .insert({ name: name, description: description });
}

//Checks for existing team before allowing user to register team
export async function createTeam(id: string, name: string, description: string) {
    if (name == "" || name == null || description == "" || description == null) {
        return false;
    }
    await getTeam(id).then((value) => {
        if (value == null) {
            createTeamLogic(name, description);
            return true;
        } else {
            return false;
        }
    });
    return true;
}

//Edit team values
export async function editTeam(id: string, name: string, description: string) {
    const nameFound = (name != null && name.trim() != "");
    const descFound = (description != null && description.trim() != "");
    const updated =
        nameFound && descFound ? { name: name, description: description }
            : nameFound ? { name: name }
                : descFound ? { description: description } : {};

    if (nameFound || descFound) {
        const { data, error } = await supabase
            .from('teams')
            .update(updated)
            .eq('id', id);
    }
}

//Gets team row where id is in the members list
export async function getTeam(id: string) {
    const { data, error } = await supabase
        .from('teams')
        .select()
        .contains('members', [id]);

    console.log(data);
    return error == null ? data[0] : null;
}

//Get all members data given the array of UUIDs
export async function getMembers(members: Array<string>) {
    const { data, error } = await supabase
        .from('users')
        .select('id, name, created_at')
        .in('id', members);
    return error == null ? data : null;
}

//Finalize a team
export async function declareTeam(id: string, status: boolean) {
    const { error } = await supabase
        .from('teams')
        .update({ declared: status })
        .eq('id', id);
}

//Leave a team
export async function leaveTeam(id: string, team_id: string) {
    const { data } = await supabase
        .from('teams')
        .select('members')
        .eq('id', team_id);
    if (data != null) {
        const newMembers = data[0].members.filter((val: string) => {
            return val != id;
        });
        if (newMembers.length == 0) {
            await supabase
                .from('teams')
                .delete()
                .eq('id', team_id);
        } else {
            await supabase
                .from('teams')
                .update({ members: newMembers })
                .eq('id', team_id);
        }
        await supabase
            .from('users')
            .update({ team_id: null })
            .eq('id', id);
    }
}

//REQUEST FUNCTIONS

export async function getUserRequests(id: string){
    const { data, error } = await supabase
    .from('requests')
    .select()
    .eq('id', id);
    return data;
}

export async function getTeamRequests(team_id: string){
    const { data, error } = await supabase 
    .from('requests')
    .select()
    .eq('team_id', team_id);
    return data ?? [];
}

//Send a request from a user
export async function sendUserRequest(id: string, team_id: string, user_name: string, team_name: string, message: string) {
    const { data, error } = await supabase
        .from('requests')
        .insert({ user_id: id, team_id: team_id, user_name: user_name, team_name: team_name, message: message, status: "pending", sent_by_user: true });
}

//Send a request from a team
export async function sendTeamRequest(id: string, team_id: string, user_name: string, team_name: string) {
    const { data, error } = await supabase
        .from('requests')
        .insert({ user_id: id, team_id: team_id, user_name: user_name, team_name: team_name, message: ("Team " + team_name + " has invited you to join their team."), status: "pending", sent_by_user: false });
}

//Delete a request given a user id and team id
export async function deleteRequest(id: string, team_id: string){
    const { error } = await supabase
    .from('requests')
    .delete()
    .eq('id', id)
    .eq('team_id', team_id);
}

//EVENT FUNCTIONS

//Get all events
export async function getEvents(){
    const { data, error } = await supabase
    .from('events')
    .select();
    return data;
}

//Delete an event given the id
export async function deleteEvent(id: string){
    const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
}

//Add an event given info
export async function addEvent(name: string, description: string, location: string, workshop: boolean) {
    const { error } = await supabase
    .from('events')
    .insert({name: name, description: description, location: location, workshop: workshop});
}

//Update an event given updated info
export async function updateEvent(id: string, description: string){
    const { error } = await supabase
    .from('events')
    .update({description: description})
    .eq('id', id);
}