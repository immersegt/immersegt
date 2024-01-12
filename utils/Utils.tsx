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

//TEAM

//Set user name given an id and name
export async function setUserTeam(id: string, team_id: string) {
    const { error } = await supabase
        .from('users')
        .update({ team_id: team_id })
        .eq('id', id);
}

export async function createTeam(name: string, description: string) {
    const { data, error } = await supabase
        .from('teams')
        .insert({ name: name, description: description });
}

export async function getTeam(id: string) {
    const { data, error } = await supabase
    .from('teams')
    .select()
    .contains('members', [id]);
    return error == null ? data[0] : null;
}