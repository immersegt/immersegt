import supabase from '../components/Supabase';

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

//Set user name given an id and name
export async function setUserTeam(id: string, team_id: string) {
    const { error } = await supabase
        .from('users')
        .update({ team_id: team_id })
        .eq('id', id);
}

//Create a new team given a name and description
//Associated user id is automatically added in Supabase for security

export async function createTeam(name: string, description: string) {
    const { data, error } = await supabase
        .from('teams')
        .insert({ name: name, description: description });
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

//REQUEST FUNCTIONS
export async function sendUserRequest(id: string, team_id: string, message: string) {
    const { data, error } = await supabase
        .from('requests')
        .insert({ user_id: id, team_id: team_id, message: message, status: "pending", sent_by_user: true });
}

export async function sendTeamRequest(id: string, team_id: string, team_name: string) {
    const { data, error } = await supabase
        .from('requests')
        .insert({ user_id: id, team_id: team_id, message: ("Team " + team_name + " has invited you to join their team."), status: "pending", sent_by_user: false });
}